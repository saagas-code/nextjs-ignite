import { render, screen } from "@testing-library/react"
import { Header } from "."

jest.mock("next/navigation", () => {
  return {
    usePathname() {
      return '/home'
    }
  }
})

describe("Header Component", () => {
  it("active link renders correctly", () => {
    render(
      <Header />
    )
    screen.debug()
    expect(screen.getByText("dashgo")).toBeInTheDocument()
    expect(screen.getByText("Matheus Almeida")).toBeInTheDocument()
  })
  
  
})