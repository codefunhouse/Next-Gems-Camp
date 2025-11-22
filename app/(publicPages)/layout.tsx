import PublicPagesLayoutContainer from "@/components/general/PublicPagesLayout";
import React from "react";

function PublicPagesLayout({ children }: { children: React.ReactNode }) {
  return <PublicPagesLayoutContainer>{children}</PublicPagesLayoutContainer>;
}

export default PublicPagesLayout;
