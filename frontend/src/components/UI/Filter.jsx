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
        className="mt-6 block w-full rounded-md border-gray-300 text-gray-600 shadow-sm
        focus:border-amber-300 focus:ring focus:ring-amber-200 focus:ring-opacity-50"
      >
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
