"use client";

import AdvertisementCard from "@/components/AdvertisementCard";

import LinkText from "@/components/LinkText";

import PageSection from "@/components/PageSection";
import PaymentSection from "@/components/PaymentSection";
import ProductsListPreview from "@/components/ProductsListPreview";

export default function DashboardPage() {
  return (
    <>
      <div className="h-[300px] bg-black"></div>
      <PageSection>
        <div className="-mt-60">
          <ProductsListPreview />
          <LinkText
            className="block w-fit mx-auto p-5 mb-10"
            href="/products"
          >
            See all
          </LinkText>
          <div className="px-6 lg:px-20">
            <AdvertisementCard />
          </div>
        </div>
        <PaymentSection />
      </PageSection>
    </>
  );
}
