import Image from "next/image";

export default function BlogBlocksRenderer({ blocks }: { blocks: any[] }) {
  return (
    <div
      className="
        prose prose-neutral max-w-none
        prose-headings:font-serif
        prose-headings:font-bold
        prose-p:leading-relaxed
      "
    >
      {blocks.map((block) => {
        switch (block.type) {
          case "heading": {
            const Tag = block.level || "h2";
            return (
              <Tag key={block.id} style={{ color: block.color }}>
                {block.value}
              </Tag>
            );
          }

          case "paragraph":
            return (
              <p key={block.id} style={{ color: block.color }}>
                {block.value}
              </p>
            );

          case "image":
            return (
              <figure key={block.id} className="my-8">
                <div
                  className="relative w-full overflow-hidden rounded-xl"
                  style={{
                    aspectRatio:
                      block.aspectRatio && block.aspectRatio !== "auto"
                        ? block.aspectRatio.replace("/", " / ")
                        : undefined,
                  }}
                >
                  <Image
                    src={block.image?.url}
                    alt={block.alt || block.caption || ""}
                    fill
                    className="object-cover"
                  />
                </div>
                {block.caption && (
                  <figcaption className="text-sm text-center text-muted-foreground mt-2">
                    {block.caption}
                  </figcaption>
                )}
              </figure>
            );

          case "callout":
            return (
              <div
                key={block.id}
                className="rounded-xl p-5 my-6"
                style={{
                  backgroundColor: block.bgColor,
                  color: block.textColor,
                }}
              >
                {block.value}
              </div>
            );

          case "quote":
            return (
              <blockquote
                key={block.id}
                className="border-l-4 pl-4 italic my-6"
                style={{ color: block.color }}
              >
                {block.value}
              </blockquote>
            );

          default:
            return null;
        }
      })}
    </div>
  );
}
