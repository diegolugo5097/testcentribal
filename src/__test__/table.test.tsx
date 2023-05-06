import { render, screen } from "@testing-library/react";
import { RecoilRoot } from "recoil";
import App from './../App'

void describe("Render table th reference", () => {
  it("should contains the th", () => {
    render(
      <RecoilRoot>
        <App/>
      </RecoilRoot>
    );
    const tableData = screen.getByText("Referencia" || "Reference");
    expect(tableData).toBeInTheDocument();
  });
});

