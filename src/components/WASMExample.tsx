import { useContext } from "react"
import { WASMContext } from "../context/WASM"

export const WASMExample = () => {
  const ctx = useContext(WASMContext)

  if (!ctx.wasm) {
    return <>...</>
  }

  return <>Computed from WASM: 4+3={ctx.wasm.add(4,3)}</>
}
