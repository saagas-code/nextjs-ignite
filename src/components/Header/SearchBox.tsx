
import { RiSearchLine } from 'react-icons/ri';

export function SearchBox() {
  return (

    <label className="hidden md:flex max-w-[400px] min-w-[100px] items-center py-3 px-4 pr-0 ml-6 text-gray-200 bg-gray-800 border-radius rounded-full ">
      <input

      className="max-w-[80%] mr-2 bg-transparent outline-none"
      placeholder="Pesquise na plataforma" 
      type="text" />
      <RiSearchLine className="text-2xl" />
    </label>
  )
}