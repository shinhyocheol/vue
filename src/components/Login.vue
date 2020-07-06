<template>
  <div class="login-wrapper">
    <div id="formContent" style="margin-top:100px;">
      <div class="first">
        <h2>Mobile Platform.ver1</h2>
      </div>
      <form>
        <input
          type="text"
          class="second"
          id="userid"
          name="userid"
          v-model="userid"
          required
          placeholder="id"
        />
        <input
          type="password"
          class="third"
          id="password"
          name="password"
          v-model="password"
          required
          placeholder="password"
        />
        <input
          type="button"
          @click="handleLogin()"
          class="fourth"
          value="Log In"
          style="margin-top:30px;"
        />
      </form>
      <div id="formFooter">
        <a class="underlineHover" href="#">Forget Password?</a>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "Login",
  data: () => ({
    section: "Login",
    loading: "",
    response: "",
    userid: null,
    password: null
  }),
  methods: {
    handleLogin() {
      if (this.userid && this.password) {
        var params = new URLSearchParams()
        params.append("id", this.userid)
        params.append("password", this.password)
        this.$http
          .post(this.$host + this.$rootpath + "/signin", params)
          .then(result => {
            var data = result.data
            if (data.isPassword) {
              var token = data["x-access-token"]
              var level = data["authority_level"]
              this.$store.commit("SET_USER", data.admin_id)
              this.$store.commit("SET_TOKEN", token)
              this.$store.commit("SET_LEVEL", level)
              if (window.localStorage) {
                localStorage.setItem("ACCESS_USER", data.admin_id)
                localStorage.setItem("ACCESS_TOKEN", token)
                localStorage.setItem("ACCESS_LEVEL", level)
              }
              this.$router.push(this.$rootpath + "/regions")
            } else {
              alert("비밀번호가 일치하지 않습니다. 확인 후 다시 시도해주시기 바랍니다.")
              return false
            }
          }).catch(e => {
            console.log(e)
            switch (e.response.status) {
              case 401:
                alert("접근 권한이 없습니다.")
                return false
              case 403:
                alert("접근 권한이 없습니다.")
                return false
              case 404:
                alert("존재하지 않는 페이지입니다.")
                return false
              case 500:
                alert("서버측에 문제가 발생했습니다. \n관리자에게 문의바랍니다.")
                console.log("Reuqest Error Info : " + e)
                return false
              case 700:
                alert("사용자의 정보가 확인되지 않습니다. \n정보 확인 후 다시 시도해주시기 바랍니다.")
                return false
            }
          })
      } else {
        alert("아이디 혹은 비밀번호를 입력하지 않으셨습니다.")
        return false
      }
    },
    toggleLoading() {
      this.loading = this.loading === "" ? "loading" : ""
    },
    resetResponse() {
      this.response = ""
    }
  }
}
</script>
<style scope>
.login-wrapper a {
  color: #92badd;
  display: inline-block;
  text-decoration: none;
  font-weight: 400;
}
.login-wrapper h2 {
  text-align: center;
  font-size: 16px;
  font-weight: 600;
  /* text-transform: uppercase; */
  display: inline-block;
  margin: 40px 8px 10px 8px;
  color: #333;
}
.login-wrapper {
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  min-height: 100%;
  padding: 20px;
}
#formContent {
  -webkit-border-radius: 10px 10px 10px 10px;
  border-radius: 10px 10px 10px 10px;
  background: #fff;
  padding: 30px;
  width: 90%;
  max-width: 450px;
  position: relative;
  padding: 0px;
  -webkit-box-shadow: 0 30px 60px 0 rgba(0, 0, 0, 0.3);
  box-shadow: 0 30px 60px 0 rgba(0, 0, 0, 0.3);
  text-align: center;
}
#formFooter {
  background-color: #f6f6f6;
  border-top: 1px solid #dce8f1;
  padding: 25px;
  text-align: center;
  -webkit-border-radius: 0 0 10px 10px;
  border-radius: 0 0 10px 10px;
}
h2.inactive {
  color: #cccccc;
}
h2.active {
  color: #0d0d0d;
  border-bottom: 2px solid #5fbae9;
}
.login-wrapper input[type="button"],
.login-wrapper input[type="submit"],
.login-wrapper input[type="reset"] {
  background-color: #56baed;
  border: none;
  color: white;
  padding: 15px 80px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  text-transform: uppercase;
  font-size: 13px;
  -webkit-box-shadow: 0 10px 30px 0 rgba(95, 186, 233, 0.4);
  box-shadow: 0 10px 30px 0 rgba(95, 186, 233, 0.4);
  -webkit-border-radius: 5px 5px 5px 5px;
  border-radius: 5px 5px 5px 5px;
  margin: 5px 20px 40px 20px;
  -webkit-transition: all 0.3s ease-in-out;
  -moz-transition: all 0.3s ease-in-out;
  -ms-transition: all 0.3s ease-in-out;
  -o-transition: all 0.3s ease-in-out;
  transition: all 0.3s ease-in-out;
}
.login-wrapper input[type="button"]:hover,
.login-wrapper input[type="submit"]:hover,
.login-wrapper input[type="reset"]:hover {
  background-color: #39ace7;
}
.login-wrapper input[type="button"]:active,
.login-wrapper input[type="submit"]:active,
.login-wrapper input[type="reset"]:active {
  -moz-transform: scale(0.95);
  -webkit-transform: scale(0.95);
  -o-transform: scale(0.95);
  -ms-transform: scale(0.95);
  transform: scale(0.95);
}
.login-wrapper input[type="text"],
.login-wrapper input[type="password"] {
  background-color: #f6f6f6;
  border: none;
  color: #0d0d0d;
  padding: 15px 32px;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 5px;
  width: 85%;
  border: 2px solid #f6f6f6;
  -webkit-transition: all 0.5s ease-in-out;
  -moz-transition: all 0.5s ease-in-out;
  -ms-transition: all 0.5s ease-in-out;
  -o-transition: all 0.5s ease-in-out;
  transition: all 0.5s ease-in-out;
  -webkit-border-radius: 5px 5px 5px 5px;
  border-radius: 5px 5px 5px 5px;
}
.login-wrapper input[type="text"]:focus {
  background-color: #fff;
  border-bottom: 2px solid #5fbae9;
}
.login-wrapper input[type="text"]:placeholder {
  color: #cccccc;
}
.login-wrapper .fadeInDown {
  -webkit-animation-name: fadeInDown;
  animation-name: fadeInDown;
  -webkit-animation-duration: 1s;
  animation-duration: 1s;
  -webkit-animation-fill-mode: both;
  animation-fill-mode: both;
}
@-webkit-keyframes fadeInDown {
  0% {
    opacity: 0;
    -webkit-transform: translate3d(0, -100%, 0);
    transform: translate3d(0, -100%, 0);
  }
  100% {
    opacity: 1;
    -webkit-transform: none;
    transform: none;
  }
}
@keyframes fadeInDown {
  0% {
    opacity: 0;
    -webkit-transform: translate3d(0, -100%, 0);
    transform: translate3d(0, -100%, 0);
  }
  100% {
    opacity: 1;
    -webkit-transform: none;
    transform: none;
  }
}
@-webkit-keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
@-moz-keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
.login-wrapper .fadeIn {
  opacity: 0;
  -webkit-animation: fadeIn ease-in 1;
  -moz-animation: fadeIn ease-in 1;
  animation: fadeIn ease-in 1;

  -webkit-animation-fill-mode: forwards;
  -moz-animation-fill-mode: forwards;
  animation-fill-mode: forwards;

  -webkit-animation-duration: 1s;
  -moz-animation-duration: 1s;
  animation-duration: 1s;
}
.login-wrapper .underlineHover:after {
  display: block;
  left: 0;
  bottom: -10px;
  width: 0;
  height: 2px;
  background-color: #56baed;
  content: "";
  transition: width 0.2s;
}
.login-wrapper .underlineHover:hover {
  color: #0d0d0d;
}
.login-wrapper .underlineHover:hover:after {
  width: 100%;
}
</style>

