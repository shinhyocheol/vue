<template>
  <!-- Main content -->
  <section class="content">
    <div class="row">
      <div class="col-xs-12">
        <alert :dismissible="true"
               type="success"
               :iconClasses="['fa', 'fa-check']"
               title="Pick Phone Admin Service">
          <span></span>
        </alert>
      </div>
      <div class="col-md-3 col-sm-6 col-xs-12">
        <info-box color-class="bg-aqua"
                  :icon-classes="['ion', 'ion-ios-gear-outline']"
                  text="CPU Traffic"
                  number="90%"></info-box>
      </div>
      <div class="col-md-3 col-sm-6 col-xs-12">
        <info-box color-class="bg-red"
                  :icon-classes="['fa', 'fa-google-plus']"
                  text="Likes"
                  number="41,410"></info-box>
      </div>
      <div class="clearfix visible-sm-block"></div>
      <div class="col-md-3 col-sm-6 col-xs-12">
        <info-box color-class="bg-green"
                  :icon-classes="['ion', 'ion-ios-cart-outline']"
                  text="Sales"
                  number="760"></info-box>
      </div>
      <div class="col-md-3 col-sm-6 col-xs-12">
        <info-box color-class="bg-yellow"
                  :icon-classes="['ion', 'ion-ios-people-outline']"
                  text="Members"
                  number="2,000"></info-box>
      </div>
    </div>
    
    <div class="col-xs-12">
      <div class="box">
        <div class="box-header with-border">
          <h3 class="box-title"></h3>
          <div class="box-body">
            <div class="col-sm-6 col-xs-12">
              <p class="text-center">
                <strong>접속 트래픽 통계 분석</strong>
              </p>
              <canvas id="trafficBar" ></canvas>
            </div>
            <hr class="visible-xs-block">
            <div class="col-sm-6 col-xs-12">
              <p class="text-center">
                <strong>데이터 차트</strong>
              </p>
              <canvas id="languagePie"></canvas>
            </div>
          </div>
        </div>
        <!-- 
          <div class="text-center">
            <small><b>Pro Tip</b> Don't forget to star us on github!</small>
          </div>
         -->
      </div>
    </div>
    <div class="row">
      <div class="col-md-3 col-sm-6 col-xs-12">
        <process-info-box color-class="bg-yellow"
                          :icon-classes="['ion', 'ion-ios-pricetag-outline']"
                          text="Inventory"
                          number="5,200"
                          :progress="50"
                          description="50% increase since May"></process-info-box>
      </div>
      <div class="col-md-3 col-sm-6 col-xs-12">
        <process-info-box color-class="bg-green"
                          :icon-classes="['ion', 'ion-ios-heart-outline']"
                          text="Mentions"
                          number="92,050"
                          :progress="20"
                          description="20% increase in 30 days"></process-info-box>
      </div>
      <div class="col-md-3 col-sm-6 col-xs-12">
        <process-info-box color-class="bg-red"
                          :icon-classes="['ion', 'ion-ios-cloud-download-outline']"
                          text="Downloads"
                          number="114,381"
                          :progress="70"
                          description="70% increase since yesterday"></process-info-box>
      </div>
      <div class="col-md-3 col-sm-6 col-xs-12">
        <process-info-box color-class="bg-aqua"
                          :icon-classes="['ion', 'ion-ios-chatbubble-outline']"
                          text="Direct Messages"
                          number="163,921"
                          :progress="40"
                          description="40% increase compared to last year"></process-info-box>
      </div>
    </div>

  </section>
</template>

<script>
import Chart from 'chart.js'
import Alert from '../widgets/Alert'
import InfoBox from '../widgets/InfoBox'
import ProcessInfoBox from '../widgets/ProcessInfoBox'

export default {
  name: 'Dashboard',
  components: {
    Alert,
    InfoBox,
    ProcessInfoBox
  },
  data () {
    return {
      generateRandomNumbers (numbers, max, min) {
        var a = []
        for (var i = 0; i < numbers; i++) {
          a.push(Math.floor(Math.random() * (max - min + 1)) + max)
        }
        return a
      }
    }
  },
  computed: {
    coPilotNumbers () {
      return this.generateRandomNumbers(12, 1000000, 10000)
    },
    personalNumbers () {
      return this.generateRandomNumbers(12, 1000000, 10000)
    },
    isMobile () {
      return (window.innerWidth <= 800 && window.innerHeight <= 600)
    }
  },
  methods: {
    getMain() {
      const token = localStorage.getItem("ACCESS_TOKEN")
      if (!token) {
        alert("인증토큰이 유효하지 않습니다. \n 다시 로그인 해주시기 바랍니다.")
        return false
      } else {
        this.$http.defaults.headers.common['x-access-token'] = token
        this.$http.get(this.$host + this.$rootpath + "/main")
        .then(result => {
          console.log("API 통신 테스트 성공")
        }).catch(e => {
          console.log("API 통신 테스트 실패")
          console.log("서버 통신 코드 : " + e.response.status)
        })
      }
    }
  },
  mounted () {
    // this.getMain()
    this.$nextTick(() => {
      var ctx = document.getElementById('trafficBar').getContext('2d')
      var config = {
        type: 'line',
        data: {
          labels: ['JANUARY', 'FEBRUARY', 'MARCH', 'APRIL', 'MAY', 'JUNE', 'JULY', 'AUGUST', 'SEPTEMBER', 'OCTOBER', 'NOVEMBER', 'DECEMBER'],
          datasets: [{
            label: '기기',
            fill: false,
            borderColor: '#284184',
            pointBackgroundColor: '#284184',
            backgroundColor: 'rgba(0, 0, 0, 0)',
            data: this.coPilotNumbers
          }, {
            label: '회원',
            borderColor: '#4BC0C0',
            pointBackgroundColor: '#4BC0C0',
            backgroundColor: 'rgba(0, 0, 0, 0)',
            data: this.personalNumbers
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: !this.isMobile,
          legend: {
            position: 'bottom',
            display: true
          },
          tooltips: {
            mode: 'label',
            xPadding: 10,
            yPadding: 10,
            bodySpacing: 10
          }
        }
      }

      new Chart(ctx, config) // eslint-disable-line no-new

      var pieChartCanvas = document.getElementById('languagePie').getContext('2d')
      var pieConfig = {
        type: 'pie',
        data: {
          labels: ['T(SK)', 'Ohlle(KT)', 'U+(LG)'],
          datasets: [{
            data: [46.6, 30.7, 21.1],
            backgroundColor: ['#00a65a', '#f39c12', '#00c0ef'],
            hoverBackgroundColor: ['#00a65a', '#f39c12', '#00c0ef']
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: !this.isMobile,
          legend: {
            position: 'bottom',
            display: true
          }
        }
      }

      new Chart(pieChartCanvas, pieConfig) // eslint-disable-line no-new
    })
  }
}
</script>
<style>
.info-box {
  cursor: pointer;
}
.info-box-content {
  text-align: center;
  vertical-align: middle;
  display: inherit;
}
.fullCanvas {
  width: 100%;
}
</style>
