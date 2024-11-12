import styled from "styled-components";

export const FollowersPageContainer = styled.div`
  .connectStyleContainer {
    display: grid;
    grid-template-columns: 400px auto 600px;
    margin: 0 10%;
    overflow: hidden;
    height: 100vh;
    @media (max-width: 2070px) {
      grid-template-columns: 400px auto 500px;
    }
    @media (max-width: 1830px) {
      grid-template-columns: 400px auto 400px;
    }
    @media (max-width: 1700px) {
      grid-template-columns: 400px auto 400px;
      margin: 0 5%;
    }
    @media (max-width: 1500px) {
      grid-template-columns: 100px auto 400px;
      margin: 0 5%;
    }
    @media (max-width: 1300px) {
      grid-template-columns: 70px auto;
      margin: 0 10%;
    }
    @media (max-width: 900px) {
      grid-template-columns: 70px auto;
      margin: 0 5%;
    }
    @media (max-width: 620px) {
      grid-template-columns: 70px auto;
      margin: 0 auto;
    }
    @media (max-width: 600px) {
      grid-template-columns: 0 auto 0;
      margin: 0 auto;
    }
    .mobileNav {
      display: none;
    }
    @media (max-width: 600px) {
      .mobileNav {
        display: flex;
        position: fixed;
        bottom: 0;
        left: 0;
        z-index: 9999;
        width: 100%;
        background-color: black;
      }
    }
    .centerGridContainer {
      overflow: auto;
      border: 1px rgb(47, 51, 54) solid;
      .connectDetails {
        padding: 20px;
        background: rgba(255, 255, 255, 0);
        box-shadow: 0 4px 30px rgba(0, 0, 0, 0);
        backdrop-filter: blur(7.6px);
        -webkit-backdrop-filter: blur(7.6px);
        position: sticky;
        top: 0;
        left: 0;
        z-index: 9;
        border-bottom: 1px #2f3336 solid;
        p {
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .shortArrow {
          font-size: calc(22px + 0.25vw);
        }
        .followingName {
          font-size: calc(18px + 0.25vw);
          @media (max-width: 450px) {
            font-size: calc(15px + 0.25vw);
          }
        }
      }
      .mappedContainer {
        display: flex;
        flex-direction: column;
        gap: 10px;
        .subMapped {
          padding: 20px;
        }
      }
      .noFollowersText {
        height: 85vh;
        h2 {
          display: flex;
          justify-content: center;
          align-items: center;
          margin: 0 auto;
          height: 100%;
        }
      }
    }
    .centerGridContainer::-webkit-scrollbar {
      width: 0px;
    }
    .rightGridContainer {
      overflow: auto;
    }
    .rightGridContainer::-webkit-scrollbar {
      width: 0px;
    }
    .mobileNav {
      display: none;
    }
    @media (max-width: 600px) {
      .mobileNav {
        display: flex;
        position: fixed;
        bottom: 0;
        left: 0;
        z-index: 9999;
        width: 100%;
        background-color: black;
      }
    }
    .postGroup {
      display: flex;
      justify-content: space-around;
      border-bottom: #575b5f 1px solid;
      @media (max-width: 460px) {
      }
      a {
        width: 60%;
        padding-top: 10px;
        text-align: center;
        cursor: pointer;
        @media (max-width: 600px) {
          padding-top: 0px;
          margin-top: 20px;
        }
      }
      a:hover {
        background-color: #181818;
      }
      li {
        width: 50%;
        margin: 0 auto;
        padding: 10px 20px;
        list-style: none;
        font-size: calc(18px + 0.25vw);
        @media (max-width: 440px) {
          width: 100%;
          margin-top: 10px;
        }
      }
      .linkActive li {
        border-bottom: 6px #1d9aef solid;
      }
      .link {
        color: #575b5f;
      }
    }
  }
`;
