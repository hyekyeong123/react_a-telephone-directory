**[npm init]**

리액트 설치
**[npm i --save react react-dom]**

개발 의존 모듈 설치
**[npm install --save-dev @babel/core babel-loader @babel/preset-react @babel/preset-env ]**
**[npm install --save-dev webpack webpack-dev-server webpack-cli html-webpack-plugin]**
**[npm i --save-dev react-hot-loader]**
이후 .babelrc 파일을 만들어 호환성 맞춰주기

// react-hot-loader 사용하기
if (module.hot) {
module.hot.accept();
}
// 다만 문제점은 리로딩할때 localstate를 유지하지 않음
// 해결책 react-hot-loader을 웹팩에 적응시키면 됨
https://react-etc.vlpt.us/05.hot-loader.html

-   엔터를 눌러도 입력할 수 있게 하는 기능
    handleKeyPress
-   버튼 클릭 후 이후 input에 자동으로 포커스
    ref를 사용해야함
-   로컬 저장소에 저장하여 새로고침해도 정보가 유지되게
    게
    localStorage에 저장하기
