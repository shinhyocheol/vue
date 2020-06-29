<template>
  <section class="content">
    <div class="container" style="padding-top:50px;">
      <form class="form-horizontal" role="form" method="post">
        <div class="form-group">
            <label class="control-label col-lg-2">아이디</label>
            <div class="col-lg-10">
                <input type="text" class="form-control"/>
            </div>
        </div>
        <div class="form-group">
            <label class="control-label col-lg-2">패스워드</label>
            <div class="col-lg-10">
                <input type="password" class="form-control"/>
            </div>
        </div>
        <div class="form-group">
            <label class="control-label col-lg-2">패스워드 확인</label>
            <div class="col-lg-10">
                <input type="password" class="form-control"/>
            </div>
        </div>
        <div class="form-group">
            <label class="control-label col-lg-2">이름</label>
            <div class="col-lg-10">
                <input type="text" class="form-control"/>
            </div>
        </div>
        
        <div class="form-group">
            <label class="control-label col-lg-2">별명</label>
            <div class="col-lg-10">
                <input type="text" class="form-control"/>
            </div>
        </div>
        
        <div class="form-group">
            <label class="control-label col-lg-2">이메일</label>
            <div class="col-lg-10">
                <input type="email" 
                       class="form-control"/>
            </div>
        </div>
        <div class="form-group">
            <label class="control-label col-lg-2">휴대폰 번호</label>
            <div class="col-lg-10">
                <input type="tel" class="form-control" />
            </div>
        </div>
        <div class="form-group">
            <label for="inputPhoneNumber" class="col-lg-2 control-label">성별</label>
            <div class="col-lg-10">
                <select class="form-control" id="gender">
                    <option value="M">남</option>
                    <option value="F">여</option>
                </select>
            </div>
        </div>
        <div class="form-group">
            <label for="inputEmailReceiveYn" class="col-lg-2 control-label">이메일 수신여부</label>
            <div class="col-lg-10">
                <label class="radio-inline">
                    <input type="radio" 
                           id="emailReceiveYn" 
                           name="emailReceiveYn" 
                           value="Y" checked> 동의합니다.
                </label>
                <label class="radio-inline">
                    <input type="radio" 
                           id="emailReceiveYn" 
                           name="emailReceiveYn" 
                           value="N"> 동의하지 않습니다.
                </label>
            </div>
        </div>
        <div class="form-group">
            <label for="inputPhoneNumber" class="col-lg-2 control-label">SMS 수신여부</label>
            <div class="col-lg-10">
                <label class="radio-inline">
                    <input type="radio" 
                           id="smsReceiveYn" 
                           name="smsReceiveYn" 
                           value="Y" checked> 동의합니다.
                </label>
                <label class="radio-inline">
                    <input type="radio" 
                           id="smsReceiveYn" 
                           name="smsReceiveYn" 
                           value="N"> 동의하지 않습니다.
                </label>
            </div>
        </div>
      </form>
      <div class="submit-btn">
          <button type="button" class="btn btn-primary">Sign in</button>
      </div>
    </div>
  </section>
</template>
<script>
import SearchBox from '@/components/views/common/SearchBox'
export default {
  name: "RegionInputs",
  components: {SearchBox},
  data() {
    return {
      regionName: null,
      regionType: null,
      regionSection: null,
      latitude: null,
      longitude: null,
      deleted: null
    }
  }
}
</script>
<style>
  .form-horizontal {
    padding:20px; 
    padding-top:40px; 
    border: 1px solid #cdcdcd;
    border-radius:4px;
    background: #fff;
  }
  .submit-btn{
    float: right;
    margin-top: 30px;
  }
</style>
