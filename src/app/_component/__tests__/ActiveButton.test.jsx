import { render, screen, fireEvent, act } from "@testing-library/react";
import { RecoilRoot } from "recoil";
import "@testing-library/jest-dom";
import ActiveButton from "../ActiveButton";
import fetchMock from "jest-fetch-mock";

jest.mock("next/navigation", () => {
  const useRouter = jest.fn().mockReturnValue({
    push: jest.fn(),
  });

  return {
    useRouter,
  };
});

// fetch mock 설정
fetchMock.enableMocks();

describe("ActiveButton", () => {
  it("Start 버튼 클릭 시 초기화 및 페이지 이동이 일어나는지 확인을 함", async () => {
    //fetch 요청에 대한 응답을 mocking처리, 실제 네트워크 요청 x
    fetchMock.mockResponseOnce(JSON.stringify({ results: [] }));

    render(
      <RecoilRoot>
        <ActiveButton type="Main" />
      </RecoilRoot>
    );

    // Start 클릭 시에 getQuizItems 함수에서 setState가 일어나기에 act로 Wrapper 처리
    await act(async () => {
      fireEvent.click(screen.getByText("Start"));
    });

    // useRouter의 push 함수가 모킹이 되려면 expect에서 한번 더 require로 접근해야함
    expect(require("next/navigation").useRouter().push).toHaveBeenCalledWith(
      "/quiz"
    );
  });
});
