import Image from "next/image";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { ArrowRight } from "lucide-react";
import { products, effectivePrice } from "@/data/products";
import { Price } from "@/components/ui/price";

/** Prominent launch-offer banner for the first `isFeatured` product. */
export async function ExclusiveOffer() {
  const product = products.find((p) => p.isFeatured);
  if (!product) return null;

  const t = await getTranslations("home");

  return (
    <section className="bg-navy">
      <div className="container-page grid items-center gap-8 py-14 lg:grid-cols-2">
        <div className="order-2 lg:order-1">
          <div className="flex flex-wrap gap-2">
            <span className="badge bg-gold text-navy">{t("exclusiveOfferBadge")}</span>
            <span className="badge bg-red text-white">{t("exclusiveOfferTag")}</span>
          </div>
          <h2 className="mt-4 font-display text-3xl uppercase leading-tight text-white sm:text-4xl">
            {product.name}
          </h2>
          <p className="mt-3 max-w-md text-white/70">{t("exclusiveOfferText")}</p>
          <div className="mt-5">
            <Price
              cents={effectivePrice(product)}
              original={product.basePrice}
              className="text-2xl text-gold"
            />
          </div>
          <Link href={`/product/${product.slug}`} className="btn-gold mt-6 inline-flex">
            {t("exclusiveOfferCta")} <ArrowRight size={18} />
          </Link>
        </div>
        <Link
          href={`/product/${product.slug}`}
          className="group relative order-1 aspect-square overflow-hidden rounded-2xl bg-white/5 ring-1 ring-white/10 lg:order-2"
        >
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            sizes="(min-width: 1024px) 480px, 100vw"
            className="object-contain p-6 transition group-hover:scale-105"
          />
        </Link>
      </div>
    </section>
  );
}
