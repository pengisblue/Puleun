import { useState } from "react";

export default function CreateKid() {
  return (
    <div>
      <h1 className="mx-2 my-4 text-title">식물 심기</h1>

      <div className="mt-6 flex flex-col gap-8">
        <section>
          <label htmlFor="">아이 애칭</label>
          <input
            type="text"
            className="mt-2 block w-full rounded-md border-gray-300 text-gray-600 shadow-sm
                focus:border-amber-300 focus:ring focus:ring-amber-200 focus:ring-opacity-50"
          />
        </section>
      </div>
    </div>
  );
}
