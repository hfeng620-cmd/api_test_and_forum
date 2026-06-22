"use client";

import { useState } from "react";

import { createSubmission } from "@/lib/submission-storage";

const submissionKinds = ["新站点", "纠错", "补充备注"] as const;

export function SubmissionPanel() {
  const [kind, setKind] = useState<(typeof submissionKinds)[number]>("新站点");
  const [stationName, setStationName] = useState("");
  const [url, setUrl] = useState("");
  const [priceOrRate, setPriceOrRate] = useState("");
  const [note, setNote] = useState("");
  const [contact, setContact] = useState("");
  const [status, setStatus] = useState("提交后不会直接上榜，会先进入你的审核区。");

  function handleSubmit() {
    if (!stationName.trim() || !note.trim()) {
      setStatus("请至少填写站点名和备注说明。");
      return;
    }

    createSubmission({
      kind,
      stationName: stationName.trim(),
      url: url.trim(),
      priceOrRate: priceOrRate.trim(),
      note: note.trim(),
      contact: contact.trim(),
    });

    setStationName("");
    setUrl("");
    setPriceOrRate("");
    setNote("");
    setContact("");
    setStatus("已提交到你的待审核区。你可以自己改后通过，也可以直接驳回。");
  }

  return (
    <div className="rounded-[32px] border border-[var(--color-line)] bg-white p-6 shadow-[var(--shadow-card)]">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--color-muted)]">
            提交补充
          </p>
          <h2 className="mt-2 text-2xl font-black">新站点、纠错、补充备注都先提到你这里审核</h2>
        </div>
        <span className="rounded-full bg-[var(--color-brand-soft)] px-3 py-1 text-xs font-bold text-[var(--color-brand-deep)]">
          提交后待审核
        </span>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <label className="space-y-2">
          <span className="text-sm font-semibold text-[var(--color-muted)]">提交类型</span>
          <select
            className="w-full rounded-2xl border border-[var(--color-line)] bg-white px-4 py-3 outline-none transition focus:border-[var(--color-brand)]"
            onChange={(event) => setKind(event.target.value as (typeof submissionKinds)[number])}
            value={kind}
          >
            {submissionKinds.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </label>

        <label className="space-y-2">
          <span className="text-sm font-semibold text-[var(--color-muted)]">站点名</span>
          <input
            className="w-full rounded-2xl border border-[var(--color-line)] bg-white px-4 py-3 outline-none transition focus:border-[var(--color-brand)]"
            onChange={(event) => setStationName(event.target.value)}
            value={stationName}
          />
        </label>

        <label className="space-y-2">
          <span className="text-sm font-semibold text-[var(--color-muted)]">地址或入口</span>
          <input
            className="w-full rounded-2xl border border-[var(--color-line)] bg-white px-4 py-3 outline-none transition focus:border-[var(--color-brand)]"
            onChange={(event) => setUrl(event.target.value)}
            value={url}
          />
        </label>

        <label className="space-y-2">
          <span className="text-sm font-semibold text-[var(--color-muted)]">倍率或价格</span>
          <input
            className="w-full rounded-2xl border border-[var(--color-line)] bg-white px-4 py-3 outline-none transition focus:border-[var(--color-brand)]"
            onChange={(event) => setPriceOrRate(event.target.value)}
            placeholder="例如：0.12x / GPT 0.2 / 免费"
            value={priceOrRate}
          />
        </label>
      </div>

      <label className="mt-4 block space-y-2">
        <span className="text-sm font-semibold text-[var(--color-muted)]">备注说明</span>
        <textarea
          className="min-h-28 w-full rounded-2xl border border-[var(--color-line)] bg-white px-4 py-3 outline-none transition focus:border-[var(--color-brand)]"
          onChange={(event) => setNote(event.target.value)}
          placeholder="写清楚你补充的是什么、看到的价格页面、模型分组、试用信息或需要纠正的内容。"
          value={note}
        />
      </label>

      <label className="mt-4 block space-y-2">
        <span className="text-sm font-semibold text-[var(--color-muted)]">联系方式或备注来源</span>
        <input
          className="w-full rounded-2xl border border-[var(--color-line)] bg-white px-4 py-3 outline-none transition focus:border-[var(--color-brand)]"
          onChange={(event) => setContact(event.target.value)}
          placeholder="例如：QQ群昵称 / 金山文档来源 / 自己实测"
          value={contact}
        />
      </label>

      <div className="mt-5 flex flex-wrap items-center justify-between gap-4">
        <p className="text-sm leading-6 text-[var(--color-muted)]">{status}</p>
        <button
          className="rounded-full bg-[var(--color-brand)] px-6 py-3 text-sm font-bold text-white transition hover:bg-[var(--color-brand-deep)]"
          onClick={handleSubmit}
          type="button"
        >
          提交给管理员审核
        </button>
      </div>
    </div>
  );
}
