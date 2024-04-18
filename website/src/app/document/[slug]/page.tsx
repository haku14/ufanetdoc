import { getDocument } from "../action";
import ContainerDocument from "../ContainerDocument";

export default async function Document({
  params,
}: {
  params: { slug: string };
}) {
  const document = await getDocument(params.slug);
  return (
    <>
      <ContainerDocument document={document!} />
    </>
  );
}
