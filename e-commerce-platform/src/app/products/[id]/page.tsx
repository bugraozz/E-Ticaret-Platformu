import { redirect } from "next/navigation";

interface ProductPageProps {
  params: { id: string };
}

export default function ProductRedirect({ params }: ProductPageProps) {
  redirect(`/en/products/${params.id}`);
}
