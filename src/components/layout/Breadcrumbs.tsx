"use client";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "../ui/breadcrumb";
import { Home, Lightbulb } from "lucide-react";

export default function AppBreadcrumbs() {
  return (
    <Breadcrumb className="py-4 px-8 bg-white border-b">
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="#">
            <span className="inline-flex items-center gap-1">
              <Home size={16} /> ホーム
            </span>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>
            <span className="inline-flex items-center gap-1">
              <Lightbulb size={16} /> アイデアスタジオ
            </span>
          </BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
} 