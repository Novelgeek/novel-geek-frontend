// line chart

export let lineChartData: Array<any> = [

  { data: [65, 59, 80, 81, 56, 55, 40], label: 'My First dataset' },
  { data: [28, 48, 40, 19, 86, 27, 90], label: 'My Second dataset' },
  { data: [45, 25, 16, 36, 67, 18, 76], label: 'My Third dataset - No bezier' }

];
export let lineChartLabels: Array<any> = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
export let lineChartOptions: any = {
  animation: {
    duration: 1000, // general animation time
    easing: 'easeOutBack'
  },
  hover: {
    animationDuration: 1000, // duration of animations when hovering an item
    mode: 'label'
  },
  responsiveAnimationDuration: 1000, // animation duration after a resize
  responsive: true,
  maintainAspectRatio: false,
  legend: {
    position: 'bottom',
  },
  scales: {
    xAxes: [{
      display: true,
      gridLines: {
        color: '#f3f3f3',
        drawTicks: false,
      },
      scaleLabel: {
        display: true,
        labelString: 'Month'
      }
    }],
    yAxes: [{
      display: true,
      gridLines: {
        color: '#f3f3f3',
        drawTicks: false,
      },
      scaleLabel: {
        display: true,
        labelString: 'Value'
      }
    }]
  },
  title: {
    display: true,
    text: 'User engagement'
  }
};
export let lineChartColors: Array<any> = [

  {

    fill: false,
    borderDash: [5, 5],
    borderColor: '#9C27B0',
    pointBorderColor: '#9C27B0',
    pointBackgroundColor: '#FFF',
    pointBorderWidth: 2,
    pointHoverBorderWidth: 2,
    pointRadius: 4,
  },
  {

    fill: false,
    borderDash: [5, 5],
    borderColor: '#00A5A8',
    pointBorderColor: '#00A5A8',
    pointBackgroundColor: '#FFF',
    pointBorderWidth: 2,
    pointHoverBorderWidth: 2,
    pointRadius: 4,
  },
  {
    lineTension: 0,
    fill: false,
    borderColor: '#FF7D4D',
    pointBorderColor: '#FF7D4D',
    pointBackgroundColor: '#FFF',
    pointBorderWidth: 2,
    pointHoverBorderWidth: 2,
    pointRadius: 4,
  },

];
export let lineChartLegend = true;
export let lineChartType = 'line';



// barChart
export let barChartOptions: any = {
  scaleShowVerticalLines: false,
  responsive: true,
  maintainAspectRatio: false

};
export let barChartLabels: string[] = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
export let barChartType = 'bar';
export let barChartLegend = true;

export let barChartData: any[] = [
  { data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A' },
];

export let barChartColors: Array<any> = [


  {

    backgroundColor: 'rgba(255, 141, 96, 0.8)',
    borderColor: 'rgba(148,159,177,1)',
    pointBackgroundColor: 'rgba(148,159,177,1)',
    pointBorderColor: '#fff',
    pointHoverBackgroundColor: '#fff',
    pointHoverBorderColor: 'rgba(148,159,177,0.8)'
  },
  {

    backgroundColor: 'rgba(0, 157, 160, 0.8)',
    borderColor: 'rgba(148,159,177,1)',
    pointBackgroundColor: 'rgba(148,159,177,1)',
    pointBorderColor: '#fff',
    pointHoverBackgroundColor: '#fff',
    pointHoverBorderColor: 'rgba(148,159,177,0.8)'
  },

];

