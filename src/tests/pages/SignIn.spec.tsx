import { render, screen } from "@testing-library/react"
import SignIn from "../../../pages"


jest.mock("next/navigation", () => {
  return {
    usePathname() {
      return '/home'
    }
  }
})

describe("SignIn Page", () => {
  it("render correctly", () => {
    render(
      <SignIn />
    )
    screen.debug()
    const teste = screen.getByLabelText('password')
    console.log("testeee", teste)
    expect(screen.getByText("Entrar")).toBeInTheDocument()
  })
  
  
})