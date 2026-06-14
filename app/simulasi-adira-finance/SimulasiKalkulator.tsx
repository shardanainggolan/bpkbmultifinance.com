"use client";

import { useState, useEffect, useRef } from "react";
import Select, { type GroupBase, type StylesConfig } from "react-select";
import { Car, Bike, Truck, ChevronRight, RotateCcw, CheckCircle, AlertCircle, Loader2, Calculator, Pencil } from "lucide-react";
import { WA_NUMBER } from "../lib/constants";

// ─── Types ────────────────────────────────────────────────────────────────────

interface Brand { id: number; nama: string; }
interface Model { id: number; nama_objek: string; tipe_kendaraan: string; }
interface TahunItem { id: number; tahun: string; }

interface InfoPencairan {
  maks_pencairan_prefix: string;
  maks_pencairan: number;
  min_pencairan_prefix: string;
  min_pencairan: number;
  dana_diterima_prefix: string;
  dana_diterima: number;
}

interface SimulasiRow {
  tenorId: number;
  tenor: number;
  angsuran_per_bulan_prefix: string;
}

interface SimulasiResult {
  informasi_jaminan: {
    jenis_jaminan: string;
    merk_kendaraan: string;
    type_kendaraan: string;
    tahun_kendaraan: string;
    tipe_asuransi: string;
    tipe_angsuran: string;
    area: string;
  };
  hasil_simulasi: {
    info_pencairan: InfoPencairan;
    list_simulasi: SimulasiRow[];
  };
}

type Stage = "form" | "results";
type JaminanId = "passanger" | "commercial" | "motor";

// ─── Constants ────────────────────────────────────────────────────────────────

const JAMINAN_TYPES = [
  { id: "passanger" as JaminanId, typeNum: 1, tipeObjekId: 1, label: "Mobil Penumpang", desc: "Sedan, SUV, MPV, Hatchback", Icon: Car },
  { id: "commercial" as JaminanId, typeNum: 1, tipeObjekId: 1, label: "Mobil Niaga", desc: "Pick-up, Minibus, Truk kecil", Icon: Truck },
  { id: "motor" as JaminanId, typeNum: 2, tipeObjekId: 2, label: "Sepeda Motor", desc: "Matic, bebek, sport", Icon: Bike },
];

const AREAS = [
  { id: 9,  label: "Jabodetabekser (Jabodetabek & Sekitarnya)" },
  { id: 10, label: "Jawa Barat" },
  { id: 11, label: "Jawa Tengah & DIY" },
  { id: 12, label: "Jawa Timur" },
  { id: 13, label: "Bali & Nusa Tenggara" },
  { id: 14, label: "Sumbagut (Sumatra Bagian Utara)" },
  { id: 15, label: "Sumbagsel (Sumatra Bagian Selatan)" },
  { id: 16, label: "Kalimantan" },
  { id: 17, label: "Sulampapua (Sulawesi, Maluku & Papua)" },
];

const TIPE_ANGSURAN = [
  { id: "addb", label: "Angsuran Dibayar di Belakang" },
  { id: "addm", label: "Angsuran Dibayar di Muka" },
];
const TIPE_ASURANSI = [
  { id: 1, label: "TLO (Total Loss Only)" },
  { id: 2, label: "All Risk" },
];

// ─── Helpers ─────────────────────────────────────────────────────────────────

function formatRupiahInput(raw: string): string {
  const digits = raw.replace(/\D/g, "");
  if (!digits) return "";
  return new Intl.NumberFormat("id-ID").format(parseInt(digits, 10));
}

function parseRupiah(f: string): number {
  return parseInt(f.replace(/\D/g, ""), 10) || 0;
}

function isMobil(id: JaminanId | null) {
  return id === "passanger" || id === "commercial";
}

function buildApiBody(
  jaminanConfig: typeof JAMINAN_TYPES[number],
  modelId: string,
  tahunId: string,
  areaId: string,
  pencairan: number,
  tipeAngsuran: string,
  tipeAsuransi: string,
  jaminanId: JaminanId | null
): Record<string, string | number> {
  const body: Record<string, string | number> = {
    tipe_objek_id: jaminanConfig.tipeObjekId,
    objek_model_id: parseInt(modelId, 10),
    tahun_kendaraan: parseInt(tahunId, 10),
    area_id: parseInt(areaId, 10),
    pencairan,
  };
  if (isMobil(jaminanId)) {
    body.tipe_angsuran_id = tipeAngsuran;
    body.tipe_asuransi_id = parseInt(tipeAsuransi, 10);
  }
  return body;
}

async function callSimulasi(body: Record<string, string | number>) {
  const res = await fetch("/api/simulasi", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const json = await res.json();
  if (!res.ok) {
    const msg = json?.message ?? json?.error ?? `HTTP ${res.status}`;
    throw new Error(msg);
  }
  return json;
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function StepHeader({ step, title, subtitle }: { step: number; title: string; subtitle?: string }) {
  return (
    <div className="flex items-start gap-4 mb-5">
      <div className="shrink-0 w-9 h-9 rounded-xl bg-secondary text-white flex items-center justify-center font-bold text-sm">
        {step}
      </div>
      <div>
        <h3 className="font-bold text-secondary text-base leading-snug">{title}</h3>
        {subtitle && <p className="text-muted text-sm mt-0.5">{subtitle}</p>}
      </div>
    </div>
  );
}

type OptionItem = { value: string; label: string };

// Suppress react-select's style injection; we provide all styles via classNames
const RS_STYLES: StylesConfig<OptionItem, false, GroupBase<OptionItem>> = {
  input: (base) => ({ ...base, margin: 0, padding: 0 }),
  menuPortal: (base) => ({ ...base, zIndex: 9999 }),
};

function SelectField({ label, value, onChange, options, disabled, loading, placeholder }: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: OptionItem[];
  disabled?: boolean;
  loading?: boolean;
  placeholder?: string;
}) {
  const selected = options.find((o) => o.value === value) ?? null;

  return (
    <div>
      <label className="block text-sm font-semibold text-secondary mb-1.5">{label}</label>
      <Select<OptionItem>
        value={selected}
        onChange={(opt) => onChange(opt?.value ?? "")}
        options={options}
        isDisabled={disabled || loading}
        isLoading={loading}
        isSearchable
        isClearable={false}
        placeholder={loading ? "Memuat data..." : (placeholder ?? "— Pilih atau ketik untuk cari —")}
        noOptionsMessage={() => "Tidak ada hasil"}
        loadingMessage={() => "Memuat data..."}
        menuPortalTarget={typeof document !== "undefined" ? document.body : null}
        menuPosition="fixed"
        styles={RS_STYLES}
        classNames={{
          control: ({ isFocused, isDisabled }) =>
            `!min-h-0 !border !rounded-xl !shadow-none !transition-all !cursor-pointer !bg-white ${
              isDisabled ? "!opacity-50 !cursor-not-allowed" : ""
            } ${isFocused ? "!border-primary !ring-2 !ring-primary/50" : "!border-gray-200"}`,
          valueContainer: () => "!px-4 !py-2.5",
          input: () => "!text-sm !text-secondary !m-0 !p-0",
          placeholder: () => "!text-sm !text-gray-400",
          singleValue: () => "!text-sm !text-secondary",
          indicatorsContainer: () => "!pr-2",
          indicatorSeparator: () => "!hidden",
          dropdownIndicator: () => "!text-muted hover:!text-secondary !transition-colors !p-1",
          loadingIndicator: () => "!text-muted !p-1",
          menu: () => "!mt-1 !rounded-xl !border !border-gray-200 !shadow-xl !bg-white !overflow-hidden",
          menuList: () => "!py-1 !max-h-60",
          option: ({ isFocused, isSelected }) =>
            `!px-4 !py-3 !text-sm !cursor-pointer !transition-colors ${
              isSelected
                ? "!bg-secondary !text-white !font-semibold"
                : isFocused
                ? "!bg-primary/10 !text-secondary"
                : "!text-secondary"
            }`,
          noOptionsMessage: () => "!px-4 !py-3 !text-sm !text-muted",
          loadingMessage: () => "!px-4 !py-3 !text-sm !text-muted",
        }}
        components={{
          DropdownIndicator: () => <ChevronRight size={16} className="rotate-90 text-muted" />,
          LoadingIndicator: () => <Loader2 size={15} className="animate-spin text-muted mr-1" />,
        }}
      />
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function SimulasiKalkulator() {
  // Form state
  const [jaminanId, setJaminanId] = useState<JaminanId | null>(null);
  const [areaId, setAreaId] = useState("");
  const [brandId, setBrandId] = useState("");
  const [modelId, setModelId] = useState("");
  const [tahunId, setTahunId] = useState("");
  const [tipeAngsuran, setTipeAngsuran] = useState("addb");
  const [tipeAsuransi, setTipeAsuransi] = useState("1");

  // Dynamic lists
  const [brands, setBrands] = useState<Brand[]>([]);
  const [models, setModels] = useState<Model[]>([]);
  const [tahunList, setTahunList] = useState<TahunItem[]>([]);

  // Loading states for dynamic lists
  const [loadingBrands, setLoadingBrands] = useState(false);
  const [loadingModels, setLoadingModels] = useState(false);
  const [loadingYears, setLoadingYears] = useState(false);

  // Result state
  const [stage, setStage] = useState<Stage>("form");
  const [loading, setLoading] = useState(false);
  const [loadingUlang, setLoadingUlang] = useState(false);
  const [infoPencairan, setInfoPencairan] = useState<InfoPencairan | null>(null);
  const [pencairan, setPencairan] = useState("");
  const [result, setResult] = useState<SimulasiResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const resultsRef = useRef<HTMLDivElement>(null);

  // Derived
  const jaminanConfig = JAMINAN_TYPES.find((j) => j.id === jaminanId);
  const selectedArea = AREAS.find((a) => String(a.id) === areaId);
  const selectedBrand = brands.find((b) => String(b.id) === brandId);
  const selectedModel = models.find((m) => String(m.id) === modelId);
  const selectedTahun = tahunList.find((t) => String(t.id) === tahunId);
  const selectedAngsuran = TIPE_ANGSURAN.find((t) => t.id === tipeAngsuran);
  const selectedAsuransi = TIPE_ASURANSI.find((t) => String(t.id) === tipeAsuransi);

  const formComplete = !!(
    jaminanId && areaId && brandId && modelId && tahunId &&
    (!isMobil(jaminanId) || (tipeAngsuran && tipeAsuransi))
  );

  // ── Fetch brands ──────────────────────────────────────────────────────────
  useEffect(() => {
    if (!jaminanId) return;
    setBrandId(""); setModelId(""); setTahunId("");
    setBrands([]); setModels([]); setTahunList([]);
    setStage("form"); setInfoPencairan(null); setResult(null); setError(null);

    const cfg = JAMINAN_TYPES.find((j) => j.id === jaminanId)!;
    setLoadingBrands(true);
    fetch(`/api/simulasi?type=brands&typeNum=${cfg.typeNum}&jaminanType=${jaminanId}`)
      .then((r) => r.json())
      .then((json) => {
        setBrands((json.data ?? []).map((d: { id: number; attributes: { nama: string } }) => ({
          id: d.id, nama: d.attributes.nama,
        })));
      })
      .catch(() => setError("Gagal memuat daftar merek."))
      .finally(() => setLoadingBrands(false));
  }, [jaminanId]);

  // ── Fetch models ──────────────────────────────────────────────────────────
  useEffect(() => {
    if (!brandId || !jaminanId) return;
    setModelId(""); setTahunId("");
    setModels([]); setTahunList([]);
    setStage("form"); setInfoPencairan(null); setResult(null); setError(null);

    setLoadingModels(true);
    fetch(`/api/simulasi?type=models&brandId=${brandId}&jaminanType=${jaminanId}`)
      .then((r) => r.json())
      .then((json) => {
        setModels((json.data ?? []).map((d: { id: number; attributes: { nama_objek: string; tipe_kendaraan: string } }) => ({
          id: d.id, nama_objek: d.attributes.nama_objek, tipe_kendaraan: d.attributes.tipe_kendaraan,
        })));
      })
      .catch(() => setError("Gagal memuat daftar model."))
      .finally(() => setLoadingModels(false));
  }, [brandId, jaminanId]);

  // ── Fetch years ───────────────────────────────────────────────────────────
  useEffect(() => {
    if (!modelId || !areaId) return;
    setTahunId("");
    setTahunList([]);
    setStage("form"); setInfoPencairan(null); setResult(null); setError(null);

    setLoadingYears(true);
    fetch(`/api/simulasi?type=years&modelId=${modelId}&areaId=${areaId}`)
      .then((r) => r.json())
      .then((json) => {
        setTahunList((json.data ?? []).map((d: { id: number; attributes: { tahun: string } }) => ({
          id: d.id, tahun: d.attributes.tahun,
        })));
      })
      .catch(() => setError("Gagal memuat daftar tahun."))
      .finally(() => setLoadingYears(false));
  }, [modelId, areaId]);

  // ── Hitung Simulasi: probe → dapat maks → hitung dengan maks ─────────────
  const handleHitung = async () => {
    if (!jaminanConfig || !formComplete) return;
    setLoading(true);
    setError(null);
    setResult(null);
    setInfoPencairan(null);

    try {
      // Call 1: probe dengan pencairan kecil untuk mendapatkan info_pencairan (min/maks)
      const probeBody = buildApiBody(jaminanConfig, modelId, tahunId, areaId, 3_000_000, tipeAngsuran, tipeAsuransi, jaminanId);
      const probeJson = await callSimulasi(probeBody);

      const ip: InfoPencairan | undefined = probeJson.data?.attributes?.hasil_simulasi?.info_pencairan;
      if (!ip || !ip.maks_pencairan) {
        setError("Simulasi tidak tersedia untuk kendaraan ini. Coba pilihan kendaraan atau area lain.");
        return;
      }
      setInfoPencairan(ip);

      // Call 2: hitung simulasi dengan nilai maks_pencairan
      const maxBody = buildApiBody(jaminanConfig, modelId, tahunId, areaId, ip.maks_pencairan, tipeAngsuran, tipeAsuransi, jaminanId);
      const calcJson = await callSimulasi(maxBody);

      const attrs = calcJson.data?.attributes;
      const list: SimulasiRow[] | undefined = attrs?.hasil_simulasi?.list_simulasi;

      if (Array.isArray(list) && list.length > 0) {
        setResult(attrs as SimulasiResult);
        setPencairan(formatRupiahInput(String(ip.maks_pencairan)));
        setStage("results");
        setTimeout(() => resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 100);
      } else {
        setError("Tidak ada data simulasi untuk kendaraan ini.");
      }
    } catch (err) {
      setError(`Gagal: ${err instanceof Error ? err.message : "koneksi gagal"}`);
    } finally {
      setLoading(false);
    }
  };

  // ── Hitung Ulang: hitung dengan nominal pencairan pilihan user ────────────
  const handleUlang = async () => {
    if (!jaminanConfig || !infoPencairan) return;

    const nominal = parseRupiah(pencairan);
    if (!nominal) {
      setError("Masukkan jumlah pencairan yang diinginkan.");
      return;
    }
    if (nominal < infoPencairan.min_pencairan) {
      setError(`Minimal pencairan adalah ${infoPencairan.min_pencairan_prefix}.`);
      return;
    }
    if (nominal > infoPencairan.maks_pencairan) {
      setError(`Maksimal pencairan adalah ${infoPencairan.maks_pencairan_prefix}.`);
      return;
    }

    setLoadingUlang(true);
    setError(null);

    try {
      const body = buildApiBody(jaminanConfig, modelId, tahunId, areaId, nominal, tipeAngsuran, tipeAsuransi, jaminanId);
      const json = await callSimulasi(body);

      const attrs = json.data?.attributes;
      const list: SimulasiRow[] | undefined = attrs?.hasil_simulasi?.list_simulasi;

      if (Array.isArray(list) && list.length > 0) {
        setResult(attrs as SimulasiResult);
        setTimeout(() => resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 100);
      } else {
        setError("Tidak ada data simulasi untuk nominal ini.");
      }
    } catch (err) {
      setError(`Gagal: ${err instanceof Error ? err.message : "koneksi gagal"}`);
    } finally {
      setLoadingUlang(false);
    }
  };

  // ── Reset ─────────────────────────────────────────────────────────────────
  const handleReset = () => {
    setJaminanId(null); setAreaId(""); setBrandId(""); setModelId("");
    setTahunId(""); setPencairan(""); setResult(null); setInfoPencairan(null);
    setBrands([]); setModels([]); setTahunList([]);
    setStage("form"); setError(null);
  };

  // ─────────────────────────────────────────────────────────────────────────
  return (
    <div className="max-w-3xl mx-auto">

      {/* ══ FORM SECTION ══ */}
      {stage === "form" ? (
        <div className="space-y-5">

          {/* Step 1: Jenis Kendaraan */}
          <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-7">
            <StepHeader step={1} title="Jenis Kendaraan" subtitle="Pilih jenis kendaraan yang akan dijadikan jaminan BPKB" />
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {JAMINAN_TYPES.map(({ id, label, desc, Icon }) => (
                <button
                  key={id}
                  onClick={() => { setJaminanId(id); setError(null); }}
                  className={`relative flex flex-col items-center gap-3 p-5 rounded-2xl border-2 text-center transition-all ${
                    jaminanId === id
                      ? "border-secondary bg-secondary text-white shadow-md"
                      : "border-gray-200 bg-white text-secondary hover:border-primary hover:bg-primary/5"
                  }`}
                >
                  {jaminanId === id && <CheckCircle size={16} className="absolute top-3 right-3 text-primary" />}
                  <Icon size={28} className={jaminanId === id ? "text-primary" : "text-secondary"} />
                  <div>
                    <p className="font-bold text-sm leading-tight">{label}</p>
                    <p className={`text-xs mt-1 ${jaminanId === id ? "text-slate-300" : "text-muted"}`}>{desc}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {jaminanId && (
            <>
              {/* Step 2: Area */}
              <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-7">
                <StepHeader step={2} title="Area Domisili" subtitle="Area tempat kendaraan terdaftar / domisili pemohon" />
                <SelectField
                  label="Area"
                  value={areaId}
                  onChange={(v) => { setAreaId(v); setTahunId(""); setTahunList([]); setError(null); }}
                  options={AREAS.map((a) => ({ value: String(a.id), label: a.label }))}
                  placeholder="— Pilih Area —"
                />
              </div>

              {/* Step 3: Merek */}
              <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-7">
                <StepHeader step={3} title="Merek Kendaraan" />
                <SelectField
                  label="Merek"
                  value={brandId}
                  onChange={setBrandId}
                  options={brands.map((b) => ({ value: String(b.id), label: b.nama }))}
                  loading={loadingBrands}
                  placeholder="— Pilih Merek —"
                />
              </div>

              {/* Step 4: Model */}
              {brandId && (
                <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-7">
                  <StepHeader step={4} title="Tipe / Model" />
                  <SelectField
                    label="Model Kendaraan"
                    value={modelId}
                    onChange={setModelId}
                    options={models.map((m) => ({
                      value: String(m.id),
                      label: m.tipe_kendaraan ? `${m.nama_objek} (${m.tipe_kendaraan})` : m.nama_objek,
                    }))}
                    loading={loadingModels}
                    placeholder="— Pilih Model —"
                  />
                  {!loadingModels && models.length === 0 && brandId && (
                    <p className="text-muted text-sm mt-2">Tidak ada model tersedia.</p>
                  )}
                </div>
              )}

              {/* Step 5: Tahun */}
              {modelId && areaId && (
                <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-7">
                  <StepHeader step={5} title="Tahun Kendaraan" />
                  <SelectField
                    label="Tahun"
                    value={tahunId}
                    onChange={setTahunId}
                    options={tahunList.map((t) => ({ value: String(t.id), label: t.tahun }))}
                    loading={loadingYears}
                    placeholder="— Pilih Tahun —"
                  />
                  {!loadingYears && tahunList.length === 0 && modelId && (
                    <p className="text-amber-600 text-sm mt-2 flex items-center gap-1.5">
                      <AlertCircle size={15} />
                      Tahun tidak tersedia untuk model dan area ini. Coba model atau area lain.
                    </p>
                  )}
                </div>
              )}

              {/* Step 6: Tipe Angsuran & Asuransi (mobil only) */}
              {tahunId && isMobil(jaminanId) && (
                <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-7">
                  <StepHeader step={6} title="Tipe Angsuran & Asuransi" subtitle="Khusus kendaraan roda empat" />
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <SelectField
                        label="Cara Penghitungan Angsuran"
                        value={tipeAngsuran}
                        onChange={setTipeAngsuran}
                        options={TIPE_ANGSURAN.map((t) => ({ value: t.id, label: t.label }))}
                      />
                      {tipeAngsuran === "addb" && (
                        <p className="mt-2 text-xs text-muted flex items-start gap-1.5">
                          <AlertCircle size={13} className="shrink-0 mt-0.5 text-blue-400" />
                          Angsuran pertama dibayarkan pada tanggal jatuh tempo pertama
                        </p>
                      )}
                      {tipeAngsuran === "addm" && (
                        <p className="mt-2 text-xs text-muted flex items-start gap-1.5">
                          <AlertCircle size={13} className="shrink-0 mt-0.5 text-blue-400" />
                          Angsuran pertama dibayarkan pada saat pencairan
                        </p>
                      )}
                    </div>
                    <div>
                      <SelectField
                        label="Tipe Asuransi"
                        value={tipeAsuransi}
                        onChange={setTipeAsuransi}
                        options={TIPE_ASURANSI.map((t) => ({ value: String(t.id), label: t.label }))}
                      />
                      {tipeAsuransi === "1" && (
                        <p className="mt-2 text-xs text-muted flex items-start gap-1.5">
                          <AlertCircle size={13} className="shrink-0 mt-0.5 text-blue-400" />
                          Kendaraan dijaminkan dengan kriteria kerusakan tertentu, atau karena kehilangan
                        </p>
                      )}
                      {tipeAsuransi === "2" && (
                        <p className="mt-2 text-xs text-muted flex items-start gap-1.5">
                          <AlertCircle size={13} className="shrink-0 mt-0.5 text-blue-400" />
                          Semua kerusakan dijamin oleh asuransi
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </>
          )}

          {/* Error */}
          {error && <ErrorBanner message={error} />}

          {/* Hitung Simulasi */}
          {tahunId && (
            <button
              onClick={handleHitung}
              disabled={!formComplete || loading}
              className="w-full flex items-center justify-center gap-3 bg-primary hover:bg-primary/90 disabled:opacity-40 disabled:cursor-not-allowed text-secondary font-bold py-5 rounded-2xl text-base transition-colors shadow-md"
            >
              {loading ? (
                <><Loader2 size={20} className="animate-spin" /> Menghitung Simulasi…</>
              ) : (
                <><Calculator size={20} /> Hitung Simulasi</>
              )}
            </button>
          )}
        </div>

      ) : (
        /* ══ VEHICLE SUMMARY CARD ══ */
        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 mb-5">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <CheckCircle size={17} className="text-green-500" />
              <span className="font-bold text-secondary text-sm">Data Kendaraan</span>
            </div>
            <button
              onClick={() => { setStage("form"); setInfoPencairan(null); setResult(null); setPencairan(""); setError(null); }}
              className="flex items-center gap-1.5 text-xs font-semibold text-secondary hover:text-primary transition-colors"
            >
              <Pencil size={13} />
              Ubah Pilihan
            </button>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-6 gap-y-3 text-sm">
            <div>
              <p className="text-muted text-xs mb-0.5">Jenis</p>
              <p className="font-semibold text-secondary">{jaminanConfig?.label}</p>
            </div>
            <div>
              <p className="text-muted text-xs mb-0.5">Area</p>
              <p className="font-semibold text-secondary">{selectedArea?.label.split(" (")[0]}</p>
            </div>
            <div>
              <p className="text-muted text-xs mb-0.5">Merek</p>
              <p className="font-semibold text-secondary">{selectedBrand?.nama}</p>
            </div>
            <div>
              <p className="text-muted text-xs mb-0.5">Model</p>
              <p className="font-semibold text-secondary">{selectedModel?.nama_objek}</p>
            </div>
            <div>
              <p className="text-muted text-xs mb-0.5">Tahun</p>
              <p className="font-semibold text-secondary">{selectedTahun?.tahun}</p>
            </div>
            {isMobil(jaminanId) && (
              <>
                <div>
                  <p className="text-muted text-xs mb-0.5">Angsuran</p>
                  <p className="font-semibold text-secondary">{selectedAngsuran?.label.split(" —")[0]}</p>
                </div>
                <div>
                  <p className="text-muted text-xs mb-0.5">Asuransi</p>
                  <p className="font-semibold text-secondary">{selectedAsuransi?.label}</p>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* ══ RESULTS SECTION ══ */}
      {stage === "results" && result && infoPencairan && (
        <div ref={resultsRef} className="space-y-5">

          {/* Plafon Info */}
          <div className="bg-secondary rounded-3xl p-6">
            <h3 className="font-bold text-white text-sm mb-4">Plafon Pinjaman Kendaraan Ini</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-white/10 rounded-2xl p-4 text-center">
                <p className="text-slate-300 text-xs mb-1">Minimal Pencairan</p>
                <p className="font-bold text-white text-lg">{infoPencairan.min_pencairan_prefix}</p>
              </div>
              <div className="bg-primary/20 border border-primary/40 rounded-2xl p-4 text-center">
                <p className="text-slate-300 text-xs mb-1">Maksimal Pencairan</p>
                <p className="font-bold text-primary text-lg">{infoPencairan.maks_pencairan_prefix}</p>
              </div>
            </div>
          </div>

          {/* Pencairan input + Hitung Ulang */}
          <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-7">
            <StepHeader
              step={isMobil(jaminanId) ? 7 : 6}
              title="Jumlah Pencairan"
              subtitle={`Masukkan nominal antara ${infoPencairan.min_pencairan_prefix} — ${infoPencairan.maks_pencairan_prefix}`}
            />
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted text-sm font-semibold pointer-events-none select-none">Rp</span>
                <input
                  type="text"
                  inputMode="numeric"
                  value={pencairan}
                  onChange={(e) => { setPencairan(formatRupiahInput(e.target.value)); setError(null); }}
                  className="w-full bg-white border border-gray-200 rounded-xl pl-10 pr-4 py-3 text-sm text-secondary focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
                />
              </div>
              <button
                onClick={handleUlang}
                disabled={!pencairan || loadingUlang}
                className="flex items-center justify-center gap-2 bg-secondary hover:bg-secondary-dark disabled:opacity-40 disabled:cursor-not-allowed text-white font-bold px-5 py-3 rounded-xl transition-colors text-sm sm:shrink-0 w-full sm:w-auto"
              >
                {loadingUlang ? <Loader2 size={16} className="animate-spin" /> : <Calculator size={16} />}
                Hitung Ulang
              </button>
            </div>
            {error && <ErrorBanner message={error} className="mt-4" />}
          </div>

          {/* Informasi Jaminan */}
          <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-7">
            <div className="flex items-center gap-2 mb-5">
              <CheckCircle size={17} className="text-green-500" />
              <h3 className="font-bold text-secondary text-base">Informasi Jaminan</h3>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-6 gap-y-4 text-sm">
              {[
                { label: "Jenis Jaminan", value: result.informasi_jaminan.jenis_jaminan },
                { label: "Merek", value: result.informasi_jaminan.merk_kendaraan },
                { label: "Tipe Kendaraan", value: result.informasi_jaminan.type_kendaraan },
                { label: "Tahun", value: result.informasi_jaminan.tahun_kendaraan },
                { label: "Area", value: result.informasi_jaminan.area },
                { label: "Dana Diterima", value: result.hasil_simulasi.info_pencairan.dana_diterima_prefix },
                ...(isMobil(jaminanId) && result.informasi_jaminan.tipe_asuransi ? [
                  { label: "Asuransi", value: result.informasi_jaminan.tipe_asuransi },
                ] : []),
                ...(isMobil(jaminanId) && result.informasi_jaminan.tipe_angsuran ? [
                  { label: "Tipe Angsuran", value: result.informasi_jaminan.tipe_angsuran },
                ] : []),
              ].map((item) => (
                <div key={item.label}>
                  <p className="text-muted text-xs mb-0.5">{item.label}</p>
                  <p className="font-semibold text-secondary">{item.value || "—"}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Tenor Table */}
          <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-7">
            <h3 className="font-bold text-secondary text-base mb-5">Pilihan Tenor & Cicilan</h3>
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left text-xs font-semibold text-muted pb-3 pr-4">Tenor</th>
                  <th className="text-right text-xs font-semibold text-muted pb-3">Angsuran per Bulan</th>
                </tr>
              </thead>
              <tbody>
                {[...result.hasil_simulasi.list_simulasi]
                  .sort((a, b) => a.tenor - b.tenor)
                  .map((row, idx, arr) => (
                    <tr key={row.tenorId} className={idx < arr.length - 1 ? "border-b border-gray-100" : ""}>
                      <td className="py-3.5 pr-4 font-medium text-secondary">{row.tenor} bulan</td>
                      <td className="py-3.5 text-right font-bold text-secondary">{row.angsuran_per_bulan_prefix}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
            <p className="text-xs text-muted mt-5">
              * Hasil simulasi bersifat estimasi. Nilai aktual ditentukan setelah survei kendaraan oleh tim Adira Finance.
            </p>
          </div>

          {/* CTA */}
          <div className="bg-muted-light rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <p className="font-bold text-secondary">Tertarik mengajukan pinjaman?</p>
              <p className="text-muted text-sm">Konsultasi gratis — tidak ada biaya sebelum persetujuan.</p>
            </div>
            <a
              href={`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent("Halo, saya sudah coba simulasi gadai BPKB dan ingin mengajukan. Mohon bantuannya.")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0 flex items-center gap-2 bg-secondary hover:bg-secondary-dark text-white font-bold px-7 py-3.5 rounded-full transition-colors whitespace-nowrap shadow-md"
            >
              <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current" aria-hidden="true">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
              </svg>
              Ajukan via WhatsApp
            </a>
          </div>
        </div>
      )}

      {/* Reset */}
      {stage !== "form" && (
        <div className="text-center mt-6">
          <button
            onClick={handleReset}
            className="inline-flex items-center gap-2 text-muted hover:text-secondary text-sm transition-colors"
          >
            <RotateCcw size={15} />
            Mulai ulang kalkulator
          </button>
        </div>
      )}
    </div>
  );
}

// ─── ErrorBanner ─────────────────────────────────────────────────────────────

function ErrorBanner({ message, className = "" }: { message: string; className?: string }) {
  return (
    <div className={`flex items-start gap-3 bg-red-50 border border-red-200 rounded-2xl p-4 ${className}`}>
      <AlertCircle size={17} className="text-red-500 shrink-0 mt-0.5" />
      <p className="text-red-700 text-sm leading-relaxed">{message}</p>
    </div>
  );
}
