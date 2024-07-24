
export const ProductCardSkeleton = () => {
  return (
    <tr>
      <td><p className="animate-pulse text-transparent bg-gray-500 dark:bg-gray-700">Loading...</p></td>
      <td><p className="animate-pulse text-transparent bg-gray-500 dark:bg-gray-700">Loading...</p></td>
      <td className="hidden min-[530px]:table-cell"><p className="animate-pulse text-transparent bg-gray-500 dark:bg-gray-700">Loading...</p></td>
      <td className="hidden min-[392px]:table-cell"><p className="animate-pulse text-transparent bg-gray-500 dark:bg-gray-700">Loading...</p></td>
      <td className="hidden md:table-cell"><p className="animate-pulse text-transparent bg-gray-500 dark:bg-gray-700">Loading...</p></td>
      <td><p className="animate-pulse text-transparent bg-gray-500 dark:bg-gray-700">Loading...</p></td>
      <td className="hidden xl:table-cell">
        <div className="flex gap-4">
          <p className="animate-pulse text-transparent bg-indigo-700">Loading...</p>
          <p className="animate-pulse text-transparent bg-red-700">Loading...</p>
        </div>
      </td>
    </tr>
  )
}

