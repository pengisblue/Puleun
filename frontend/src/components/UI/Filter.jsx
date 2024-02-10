export default function Filter({
  targetList,
  filterKey,
  filterValue,
  option,
  onFilterChange,
  allTarget,
}) {
  const handleChange = (event) => {
    onFilterChange(Number(event.target.value));
  };

  return (
    <div>
      <select
        onChange={handleChange}
        className="mt-2 block w-full rounded-lg border-gray-100 text-gray-800 shadow-md
        focus:border-amber-100 focus:ring focus:ring-amber-200 focus:ring-opacity-50"
      >
        <option value="" className={"hidden"}>
          선택
        </option>

        <option value="" className={allTarget ? "" : "hidden"}>
          전체
        </option>

        {targetList.map((target) => (
          <option key={target[filterKey]} value={target[filterValue]}>
            {target[option]}
          </option>
        ))}
      </select>
    </div>
  );
}
