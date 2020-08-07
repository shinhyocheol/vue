export const common = {
  methods: {
    dateFormatString(date) {
      let year = date.getFullYear()
      let month = String(date.getMonth() + 1).padStart(2, 0)
      let day = String(date.getDate()).padStart(2, 0)
      let returnDate = year + "-" + month + "-" + day
      return returnDate
    },
    handleException(e) {
      console.log(e.response.status)
      switch (e.response.status) {
        case 400:
          alert("요청방식이 올바르지 않습니다. \n관리자에게 문의바랍니다.")
          console.log(e)
          console.log("msg : " + e.response.data)
          break
        case 401:
          alert("사용자 인증 권한이 만료되었습니다.")
          console.log(e)
          console.log("msg : " + e.response.data)
          break
        case 403:
          alert("사용자 접근이 거부되었습니다. ")
          console.log(e)
          console.log("msg : " + e.response.data)
          break
        case 404:
          alert("존재하지 않는 주소입니다.")
          console.log(e)
          console.log("msg : " + e.response.data)
          break
        case 500:
          alert("서버측에 문제가 발생했습니다. \n관리자에게 문의바랍니다.")
          console.log(e)
          console.log("msg : " + e.response.data)
          break
        case 700:
          console.log(e)
          console.log("msg : " + e.response.data)
          break
      }
    }
  }
}
export default common
