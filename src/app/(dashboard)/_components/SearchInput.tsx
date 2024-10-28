"use client";

import { Input } from "@/components/ui/input";
import { useDebounce } from "@/hooks/useDebounce";
import { Search } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

import qs from "query-string";

const SearchInput = () => {
  const searchParams = useSearchParams();

  const [value, setValue] = useState(searchParams.get("title") || "");
  const debouncedValue = useDebounce(value);

  const router = useRouter();
  const pathName = usePathname();

  const category = searchParams.get("category");

  useEffect(() => {
    const url = qs.stringifyUrl(
      {
        url: pathName,
        query: {
          category,
          title: debouncedValue,
        },
      },
      { skipNull: true, skipEmptyString: true },
    );

    router.push(url);
  }, [debouncedValue, category, router, pathName, value]);

  return (
    <div className="relative">
      <Search className="absolute left-3 top-3 size-4 text-slate-400" />
      <Input
        placeholder="Search for a course.."
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="w-full rounded-full border-none bg-slate-500 pl-9 text-white outline-none placeholder:text-slate-100 focus-visible:ring-slate-200 md:w-[300px]"
      />
    </div>
  );
};

export default SearchInput;
