import { LinkButton } from "@/components/ui/Button";
import { PageHeader } from "@/components/site/PageHeader";

export default function NotFound() {
  return (
    <>
      <PageHeader eyebrow="404" title="We couldn&apos;t find that page" width="max-w-3xl">
        The campaign or profile may not exist, or the link is wrong.
      </PageHeader>
      <div className="mx-auto max-w-3xl px-4 py-10">
        <LinkButton href="/campaigns">Browse campaigns</LinkButton>
      </div>
    </>
  );
}
