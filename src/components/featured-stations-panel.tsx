"use client";

import { useState } from "react";

import type { HomeFeaturedStation } from "@/lib/site-data";
import {
  clearFeaturedStationDrafts,
  loadFeaturedStationDrafts,
  saveFeaturedStationDrafts,
} from "@/lib/featured-station-storage";

type Props = {
  initialStations: HomeFeaturedStation[];
};

export function FeaturedStationsPanel({ initialStations }: Props) {
  const [stations, setStations] = useState<HomeFeaturedStation[]>(
    () => loadFeaturedStationDrafts() ?? initialStations,
  );
  const [isEditing, setIsEditing] = useState(false);

  function updateStation(index: number, field: keyof HomeFeaturedStation, value: string) {
    setStations((current) =>
      current.map((station, stationIndex) =>
        stationIndex === index ? { ...station, [field]: value } : station,
      ),
    );
  }

  function saveChanges() {
    saveFeaturedStationDrafts(stations);
    setIsEditing(false);
  }

  function resetChanges() {
    clearFeaturedStationDrafts();
    setStations(initialStations);
    setIsEditing(false);
  }

  return (
    <div className="rounded-[34px] border border-[var(--color-line)] bg-white p-6 shadow-[0_18px_60px_rgba(13,25,48,0.07)]">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--color-muted)]">
            精选中转站
          </p>
          <h2 className="mt-2 text-3xl font-black">首页先放这四个</h2>
          <p className="mt-2 text-sm leading-6 text-[var(--color-muted)]">
            你后面可以把这块交给管理员改文案。当前先做成本地可编辑原型，后面再接真正的多人后台。
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <button
            className="rounded-full bg-[var(--color-soft)] px-4 py-2 text-sm font-bold text-[var(--color-brand-deep)] transition hover:bg-[var(--color-brand-soft)]"
            onClick={() => setIsEditing((value) => !value)}
            type="button"
          >
            {isEditing ? "退出编辑" : "管理员编辑"}
          </button>
          <button
            className="rounded-full border border-[var(--color-line)] bg-white px-4 py-2 text-sm font-bold text-[var(--color-ink)] transition hover:bg-[var(--color-soft)]"
            onClick={resetChanges}
            type="button"
          >
            重置描述
          </button>
        </div>
      </div>

      <div className="mt-6 overflow-hidden rounded-[28px] border border-[var(--color-line)]">
        <div className="grid grid-cols-[1fr_0.8fr_0.7fr_1.2fr] bg-[var(--color-soft)] px-4 py-3 text-sm font-bold text-[var(--color-muted)]">
          <span>站点</span>
          <span>价格</span>
          <span>倍率</span>
          <span>首页为什么先看它</span>
        </div>
        {stations.map((station, index) => (
          <article
            key={station.name}
            className={`grid grid-cols-[1fr_0.8fr_0.7fr_1.2fr] items-start gap-3 px-4 py-4 ${
              index % 2 === 0 ? "bg-white" : "bg-[#f9fbfe]"
            }`}
          >
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="font-bold">{station.name}</h3>
                <span className="rounded-full bg-[var(--color-brand-soft)] px-2.5 py-1 text-xs font-bold text-[var(--color-brand-deep)]">
                  {station.badge}
                </span>
              </div>
              {isEditing ? (
                <textarea
                  className="mt-3 min-h-24 w-full rounded-2xl border border-[var(--color-line)] bg-white px-3 py-3 text-sm leading-6 text-[var(--color-muted)] outline-none transition focus:border-[var(--color-brand)]"
                  onChange={(event) => updateStation(index, "summary", event.target.value)}
                  value={station.summary}
                />
              ) : (
                <p className="mt-2 text-sm leading-6 text-[var(--color-muted)]">
                  {station.summary}
                </p>
              )}
            </div>

            {isEditing ? (
              <input
                className="rounded-2xl border border-[var(--color-line)] bg-white px-3 py-3 text-sm font-bold outline-none transition focus:border-[var(--color-brand)]"
                onChange={(event) => updateStation(index, "price", event.target.value)}
                value={station.price}
              />
            ) : (
              <p className="pt-1 font-bold">{station.price}</p>
            )}

            {isEditing ? (
              <input
                className="rounded-2xl border border-[var(--color-line)] bg-white px-3 py-3 text-sm font-bold outline-none transition focus:border-[var(--color-brand)]"
                onChange={(event) => updateStation(index, "multiplier", event.target.value)}
                value={station.multiplier}
              />
            ) : (
              <p className="pt-1 font-bold">{station.multiplier}</p>
            )}

            {isEditing ? (
              <textarea
                className="min-h-24 w-full rounded-2xl border border-[var(--color-line)] bg-white px-3 py-3 text-sm leading-6 text-[var(--color-muted)] outline-none transition focus:border-[var(--color-brand)]"
                onChange={(event) => updateStation(index, "reason", event.target.value)}
                value={station.reason}
              />
            ) : (
              <p className="text-sm leading-6 text-[var(--color-muted)]">
                {station.reason}
              </p>
            )}
          </article>
        ))}
      </div>

      <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-[var(--color-muted)]">
          当前是本地保存原型，适合先确认管理员改文案的交互。
        </p>
        <div className="flex flex-wrap gap-3">
          <button
            className="rounded-full bg-[var(--color-brand)] px-5 py-3 text-sm font-bold text-white transition hover:bg-[var(--color-brand-deep)] disabled:cursor-not-allowed disabled:opacity-50"
            disabled={!isEditing}
            onClick={saveChanges}
            type="button"
          >
            保存描述
          </button>
        </div>
      </div>
    </div>
  );
}
