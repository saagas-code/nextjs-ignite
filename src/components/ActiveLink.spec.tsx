import { screen, render } from "@testing-library/react"
import { ActiveLink } from "./ActiveLink"

jest.mock("next/navigation", () => {
  return {
    usePathname() {
      return '/home'
    }
  }
})

describe("ActiveLink Component", () => {
  it("active link renders correctly", () => {
    render(
      <ActiveLink href="/" >
        <div>Home</div>
      </ActiveLink>
    )
    expect(screen.getByText("Home")).toBeInTheDocument()
  })
  
  it("return active link with active class", () => {
    const {container} = render(
      <ActiveLink href="/home" >
        <div>Home</div>
      </ActiveLink>
    )

    expect(container.getElementsByClassName('text-pink-500').length).toBe(1);
  })
  
  it("return active link without active class", () => {
    const {container} = render(
      <ActiveLink href="/wrongPath" >
        <div>Home</div>
      </ActiveLink>
    )
    expect(container.getElementsByClassName('text-gray-50').length).toBe(1);
  })
})