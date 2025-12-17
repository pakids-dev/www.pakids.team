"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

type RangeKey = "today" | "7d" | "30d";

type AnalyticsRow = {
  channel: string;
  count: number;
};

type SessionStat = { channel: string; sessions: number };
type SectionAverage = {
  channel: string;
  avgPerSession: number;
  totalSections: number;
};
type CtaTypeAverage = {
  channel: string;
  items: { ctaType: string; avgPerSession: number; total: number }[];
  sessions: number;
};

type AnalyticsResponse = {
  range: string;
  startDate: string;
  endDate: string;
  total: number;
  rows: AnalyticsRow[];
  sessionStats: SessionStat[];
  sectionAverages: SectionAverage[];
  ctaTypeAverages: CtaTypeAverage[];
  error?: string;
};

const rangeOptions: { label: string; value: RangeKey }[] = [
  { label: "오늘", value: "today" },
  { label: "7일", value: "7d" },
  { label: "30일", value: "30d" },
];

function formatAvg(value: number) {
  if (Number.isNaN(value)) return "0";
  if (value === 0) return "0";
  if (value % 1 === 0) return value.toString();
  return value.toFixed(2);
}

export default function AdminPage() {
  const [isAuthed, setIsAuthed] = useState(false);
  const [checking, setChecking] = useState(true);
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState("");
  const [authLoading, setAuthLoading] = useState(false);

  const [range, setRange] = useState<RangeKey>("7d");
  const [data, setData] = useState<AnalyticsResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const check = async () => {
      try {
        const res = await fetch("/api/admin/auth", { method: "GET" });
        const json = (await res.json()) as { authenticated: boolean };
        if (json.authenticated) {
          setIsAuthed(true);
        }
      } catch {
        // ignore
      } finally {
        setChecking(false);
      }
    };
    check();
  }, []);

  useEffect(() => {
    if (!isAuthed) return;
    const fetchData = async () => {
      setLoading(true);
      setError("");
      try {
        const res = await fetch(`/api/admin/analytics?range=${range}`, {
          method: "GET",
        });
        const json = (await res.json()) as AnalyticsResponse;
        if (!res.ok) {
          setError(json?.error || "데이터를 불러오지 못했습니다.");
          setData(null);
        } else {
          setData(json);
        }
      } catch (err) {
        console.error(err);
        setError("데이터를 불러오는 중 오류가 발생했습니다.");
        setData(null);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [isAuthed, range]);

  const chartData = useMemo(() => {
    if (!data?.rows) return [];
    return data.rows.map((row) => ({
      channel: row.channel,
      count: row.count,
    }));
  }, [data]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setAuthError("");
    setAuthLoading(true);
    try {
      const res = await fetch("/api/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const json = (await res.json()) as {
        authenticated?: boolean;
        error?: string;
      };
      if (!res.ok || !json.authenticated) {
        setAuthError(json?.error || "로그인에 실패했습니다.");
        return;
      }
      setIsAuthed(true);
    } catch (err) {
      console.error(err);
      setAuthError("로그인 중 오류가 발생했습니다.");
    } finally {
      setAuthLoading(false);
    }
  };

  return (
    <main className="space-y-8">
      <div className="flex flex-col gap-2">
        <p className="text-sm font-semibold text-blue-600">관리자 전용</p>
        <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">
          GA4 채널별 유입 통계 대시보드
        </h1>
        <p className="text-sm text-slate-600">
          `/toss-miniapp`에 설정된 GA4 이벤트를 기반으로 채널별 페이지뷰를
          확인합니다.
        </p>
      </div>

      {!isAuthed ? (
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <div className="mb-4">
            <h2 className="text-lg font-semibold text-slate-900">
              접근 비밀번호
            </h2>
            <p className="text-sm text-slate-600">
              관리자 비밀번호를 입력해 주세요.
            </p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <label
                className="text-sm font-medium text-slate-700"
                htmlFor="password"
              >
                비밀번호
              </label>
              <input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm shadow-sm outline-none ring-0 transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                placeholder="관리자 비밀번호"
              />
            </div>
            {authError ? (
              <p className="text-sm text-red-600">{authError}</p>
            ) : null}
            <button
              type="submit"
              disabled={authLoading || checking}
              className="inline-flex h-10 items-center justify-center rounded-lg bg-blue-600 px-4 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {authLoading ? "확인 중..." : "접속하기"}
            </button>
          </form>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between sm:p-5">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-blue-600">
                Channel Overview
              </p>
              <p className="text-lg font-bold text-slate-900">
                채널별 페이지뷰
              </p>
              <p className="text-sm text-slate-600">
                {data?.startDate} ~ {data?.endDate}
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              {rangeOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => setRange(option.value)}
                  className={`rounded-full border px-3 py-1 text-sm font-semibold transition ${
                    range === option.value
                      ? "border-blue-600 bg-blue-50 text-blue-700"
                      : "border-slate-200 bg-white text-slate-700 hover:border-blue-200"
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          {loading ? (
            <div className="rounded-2xl border border-slate-200 bg-white p-6 text-sm text-slate-600 shadow-sm">
              불러오는 중입니다...
            </div>
          ) : error ? (
            <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-sm text-red-700 shadow-sm">
              {error}
            </div>
          ) : (
            <>
              <div className="grid gap-6 lg:grid-cols-[1.3fr,1fr]">
                <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-semibold text-slate-800">
                      채널별 막대 차트
                    </p>
                    <span className="text-xs text-slate-500">
                      총 {data?.total ?? 0} 뷰
                    </span>
                  </div>
                  <div className="mt-4 h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={chartData} margin={{ left: -10 }}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                        <XAxis dataKey="channel" tick={{ fontSize: 12 }} />
                        <YAxis tick={{ fontSize: 12 }} />
                        <Tooltip
                          formatter={(value: number) => [
                            `${value} 뷰`,
                            "뷰 수",
                          ]}
                          labelFormatter={(label) => `채널: ${label}`}
                        />
                        <Bar
                          dataKey="count"
                          fill="#2563eb"
                          radius={[6, 6, 0, 0]}
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                <div className="space-y-3 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                  <div className="flex items-baseline justify-between">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wide text-blue-600">
                        Total Views
                      </p>
                      <p className="text-2xl font-bold text-slate-900">
                        {data?.total ?? 0}
                      </p>
                    </div>
                    <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
                      {rangeOptions.find((r) => r.value === range)?.label}
                    </span>
                  </div>
                  <div className="divide-y divide-slate-100 border border-slate-100 rounded-xl">
                    {(data?.rows ?? []).map((row) => (
                      <div
                        key={row.channel}
                        className="flex items-center justify-between px-4 py-3 text-sm"
                      >
                        <div className="flex items-center gap-2">
                          <span className="h-2 w-2 rounded-full bg-blue-500" />
                          <span className="font-medium text-slate-800">
                            {row.channel}
                          </span>
                        </div>
                        <span className="font-semibold text-slate-900">
                          {row.count}
                        </span>
                      </div>
                    ))}
                    {(data?.rows?.length ?? 0) === 0 ? (
                      <div className="px-4 py-3 text-sm text-slate-500">
                        데이터가 없습니다.
                      </div>
                    ) : null}
                  </div>
                </div>
              </div>

              <div className="grid gap-6 lg:grid-cols-3">
                <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                  <div className="flex items-baseline justify-between">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wide text-blue-600">
                        Sessions
                      </p>
                      <p className="text-lg font-bold text-slate-900">
                        채널별 고유 세션 수(고유 사용자)
                      </p>
                    </div>
                  </div>
                  <div className="mt-3 divide-y divide-slate-100 border border-slate-100 rounded-xl">
                    {(data?.sessionStats ?? []).map((row) => (
                      <div
                        key={row.channel}
                        className="flex items-center justify-between px-4 py-3 text-sm"
                      >
                        <div className="flex items-center gap-2">
                          <span className="h-2 w-2 rounded-full bg-emerald-500" />
                          <span className="font-medium text-slate-800">
                            {row.channel}
                          </span>
                        </div>
                        <span className="font-semibold text-slate-900">
                          {row.sessions.toLocaleString()}
                        </span>
                      </div>
                    ))}
                    {(data?.sessionStats?.length ?? 0) === 0 ? (
                      <div className="px-4 py-3 text-sm text-slate-500">
                        데이터가 없습니다.
                      </div>
                    ) : null}
                  </div>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                  <div className="flex items-baseline justify-between">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wide text-blue-600">
                        Section Views
                      </p>
                      <p className="text-lg font-bold text-slate-900">
                        세션당 평균 섹션 뷰
                      </p>
                    </div>
                  </div>
                  <div className="mt-3 divide-y divide-slate-100 border border-slate-100 rounded-xl">
                    {(data?.sectionAverages ?? []).map((row) => (
                      <div
                        key={row.channel}
                        className="flex items-center justify-between px-4 py-3 text-sm"
                      >
                        <div className="flex flex-col">
                          <span className="font-medium text-slate-800">
                            {row.channel}
                          </span>
                          <span className="text-xs text-slate-500">
                            총 {row.totalSections.toLocaleString()} 섹션 뷰
                          </span>
                        </div>
                        <span className="font-semibold text-slate-900">
                          {formatAvg(row.avgPerSession)}
                        </span>
                      </div>
                    ))}
                    {(data?.sectionAverages?.length ?? 0) === 0 ? (
                      <div className="px-4 py-3 text-sm text-slate-500">
                        데이터가 없습니다.
                      </div>
                    ) : null}
                  </div>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                  <div className="flex items-baseline justify-between">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wide text-blue-600">
                        CTA Clicks
                      </p>
                      <p className="text-lg font-bold text-slate-900">
                        CTA 타입별 세션당 평균
                      </p>
                    </div>
                  </div>
                  <div className="mt-3 space-y-3">
                    {(data?.ctaTypeAverages ?? []).map((row) => (
                      <div
                        key={row.channel}
                        className="rounded-xl border border-slate-100"
                      >
                        <div className="flex items-center justify-between px-4 py-3">
                          <span className="font-medium text-slate-800">
                            {row.channel}
                          </span>
                          <span className="text-xs text-slate-500">
                            세션 {row.sessions.toLocaleString()}
                          </span>
                        </div>
                        <div className="divide-y divide-slate-100">
                          {(row.items ?? []).map((item) => (
                            <div
                              key={`${row.channel}-${item.ctaType}`}
                              className="flex items-center justify-between px-4 py-3 text-sm"
                            >
                              <div className="flex flex-col">
                                <span className="font-medium text-slate-800">
                                  {item.ctaType}
                                </span>
                                <span className="text-xs text-slate-500">
                                  총 {item.total.toLocaleString()} 클릭
                                </span>
                              </div>
                              <span className="font-semibold text-slate-900">
                                {formatAvg(item.avgPerSession)}
                              </span>
                            </div>
                          ))}
                          {(row.items?.length ?? 0) === 0 ? (
                            <div className="px-4 py-3 text-sm text-slate-500">
                              데이터가 없습니다.
                            </div>
                          ) : null}
                        </div>
                      </div>
                    ))}
                    {(data?.ctaTypeAverages?.length ?? 0) === 0 ? (
                      <div className="rounded-xl border border-slate-100 px-4 py-3 text-sm text-slate-500">
                        데이터가 없습니다.
                      </div>
                    ) : null}
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </main>
  );
}
