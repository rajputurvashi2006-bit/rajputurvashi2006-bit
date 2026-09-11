import {Bell, Database, LockKeyhole, Save, Settings as SettingsIcon, ShieldCheck} from "lucide-react";
import {useState} from "react";

const sideTabs = [
  {label: "General", Icon: SettingsIcon, active: true},
  {label: "Evidence", Icon: Database, active: false},
  {label: "Notifications", Icon: Bell, active: false},
  {label: "Security", Icon: LockKeyhole, active: false}
] as const;

export default function Settings() {
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    window.setTimeout(() => setSaved(false), 1200);
  };

  return (
    <div className="space-y-6 p-6">
      <div>
        <p className="text-xs font-semibold uppercase tracking-widest text-navy-700">Workstation configuration</p>
        <h1 className="mt-1 text-2xl font-bold text-slate-900">Settings</h1>
        <p className="mt-2 text-sm text-slate-500">
          Configure evidence processing, review behaviour and local workstation preferences.
        </p>
      </div>

      <div className="grid gap-5 lg:grid-cols-[220px_1fr]">
        <aside className="card h-fit p-2">
          {sideTabs.map(({label, Icon, active}) => (
            <button
              key={label}
              className={`flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-left text-sm font-medium ${active ? "bg-navy-50 text-navy-700" : "text-slate-600 hover:bg-slate-50"}`}
            >
              <Icon size={17} />
              {label}
            </button>
          ))}
        </aside>

        <div className="space-y-5">
          <section className="card p-6">
            <div className="flex items-start gap-3">
              <SettingsIcon size={19} className="text-navy-700" />
              <div>
                <h2 className="text-sm font-semibold">General preferences</h2>
                <p className="mt-1 text-xs text-slate-500">Default behaviour for the inspection workstation.</p>
              </div>
            </div>

            <div className="mt-6 space-y-5">
              <label>
                <span className="mb-1.5 block text-xs font-medium">Default division</span>
                <select className="input max-w-md">
                  <option>Gautam Buddha Nagar Division</option>
                  <option>Bijnor Division</option>
                </select>
              </label>

              <label>
                <span className="mb-1.5 block text-xs font-medium">Evidence retention</span>
                <select className="input max-w-md">
                  <option>As per departmental policy</option>
                  <option>90 days — demo</option>
                </select>
              </label>

              <div className="flex items-center justify-between border-t border-slate-100 pt-5">
                <div>
                  <p className="text-xs font-semibold">Require officer confirmation</p>
                  <p className="mt-1 text-[10px] text-slate-500">Always require human review before final status.</p>
                </div>
                <input type="checkbox" defaultChecked />
              </div>
            </div>
          </section>

          <section className="card p-6">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <ShieldCheck size={19} className="text-emerald-600" />
                <div>
                  <h2 className="text-sm font-semibold">Security & workflow policy</h2>
                  <p className="mt-1 text-xs text-slate-500">Operational safeguards for evidence handling.</p>
                </div>
              </div>

              <button
                onClick={handleSave}
                className="inline-flex items-center gap-2 rounded-lg bg-[#1B365D] px-3.5 py-2 text-xs font-bold text-white"
              >
                <Save size={14} />
                {saved ? "Saved" : "Save settings"}
              </button>
            </div>

            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Session timeout</p>
                <p className="mt-1 text-sm font-black text-slate-800">30 minutes</p>
              </div>
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Audit mode</p>
                <p className="mt-1 text-sm font-black text-slate-800">Enabled</p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
