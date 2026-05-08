import UtmForm from "@/components/UtmForm";

export default function NewCampaignPage() {
  return (
    <main className="mx-auto w-full max-w-3xl px-4 py-10 sm:px-6 sm:py-14">
      <h1 className="text-2xl font-bold text-ink-900 sm:text-3xl">New campaign</h1>
      <p className="mt-1 text-sm text-ink-500">
        Define UTM params and a hypothesis. After creation you'll get a trackable <code className="font-mono text-xs">/go/&lt;slug&gt;</code> short link.
      </p>
      <div className="mt-8">
        <UtmForm />
      </div>
    </main>
  );
}
