// InvestPro - Vanilla JavaScript
document.addEventListener('DOMContentLoaded', function() {
  // Initialize based on current page
  const currentPage = window.location.pathname.split('/').pop() || 'l_index.html';
  
  if (currentPage === 'l_index.html' || currentPage === '') {
    initPortfolioPage();
  } else if (currentPage === 'l_marche.html') {
    initMarketPage();
  } else if (currentPage === 'l_cours.html') {
    initCoursePage();
  }
});
// ========== Portfolio Page ==========
function initPortfolioPage() {
  initBalanceToggle();
  initPeriodSelector();
  initCharts();
}
function initBalanceToggle() {
  const toggleBtn = document.getElementById('toggleBalance');
  const balanceAmount = document.getElementById('balanceAmount');
  const eyeIcon = document.getElementById('eyeIcon');
  let isVisible = true;
  if (toggleBtn) {
    toggleBtn.addEventListener('click', function() {
      isVisible = !isVisible;
      if (isVisible) {
        balanceAmount.textContent = '41 783,72 €';
        eyeIcon.innerHTML = '<path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/>';
      } else {
        balanceAmount.textContent = '••••••';
        eyeIcon.innerHTML = '<path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"/><path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"/><path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"/><line x1="2" x2="22" y1="2" y2="22"/>';
      }
    });
  }
}
function initPeriodSelector() {
  const periodBtns = document.querySelectorAll('.period-btn');
  
  periodBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      periodBtns.forEach(b => b.classList.remove('active'));
      this.classList.add('active');
      
      const period = this.dataset.period;
      updatePerformanceChart(period);
    });
  });
}
function initCharts() {
  // Performance Chart
  const perfCtx = document.getElementById('performanceChart');
  if (perfCtx) {
    window.performanceChart = new Chart(perfCtx, {
      type: 'line',
      data: getPerformanceData('1S'),
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            backgroundColor: 'hsl(260, 30%, 12%)',
            borderColor: 'hsl(270, 30%, 30%)',
            borderWidth: 1,
            titleColor: 'hsl(270, 20%, 95%)',
            bodyColor: 'hsl(270, 20%, 95%)',
            padding: 12,
            cornerRadius: 12,
            displayColors: false,
            callbacks: {
              label: function(context) {
                return new Intl.NumberFormat('fr-FR', {
                  style: 'currency',
                  currency: 'EUR'
                }).format(context.parsed.y);
              }
            }
          }
        },
        scales: {
          x: {
            grid: { display: false },
            ticks: { color: 'hsl(270, 15%, 60%)' }
          },
          y: {
            display: false
          }
        },
        elements: {
          line: {
            tension: 0.4,
            borderWidth: 2,
            borderColor: 'hsl(270, 70%, 60%)',
            fill: true,
            backgroundColor: function(context) {
              const chart = context.chart;
              const { ctx, chartArea } = chart;
              if (!chartArea) return;
              const gradient = ctx.createLinearGradient(0, chartArea.top, 0, chartArea.bottom);
              gradient.addColorStop(0, 'hsla(270, 70%, 60%, 0.4)');
              gradient.addColorStop(1, 'hsla(270, 70%, 60%, 0)');
              return gradient;
            }
          },
          point: {
            radius: 0,
            hoverRadius: 6,
            hoverBackgroundColor: 'hsl(270, 70%, 60%)',
            hoverBorderColor: '#fff',
            hoverBorderWidth: 2
          }
        }
      }
    });
  }
  // Allocation Chart
  const allocCtx = document.getElementById('allocationChart');
  if (allocCtx) {
    new Chart(allocCtx, {
      type: 'doughnut',
      data: {
        labels: ['Actions', 'Crypto', 'ETF', 'Obligations'],
        datasets: [{
          data: [45, 30, 15, 10],
          backgroundColor: [
            'hsl(270, 70%, 60%)',
            'hsl(145, 65%, 45%)',
            'hsl(220, 70%, 55%)',
            'hsl(40, 90%, 55%)'
          ],
          borderWidth: 0,
          spacing: 4
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: '60%',
        plugins: {
          legend: { display: false }
        }
      }
    });
  }
}
function getPerformanceData(period) {
  const datasets = {
    '1S': {
      labels: ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'],
      data: [38500, 39200, 38800, 40100, 41200, 41500, 41783]
    },
    '1M': {
      labels: ['S1', 'S2', 'S3', 'S4'],
      data: [35000, 36500, 38200, 41783]
    },
    '1A': {
      labels: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Jun', 'Jul', 'Aoû', 'Sep', 'Oct', 'Nov', 'Déc'],
      data: [28000, 29500, 31200, 30800, 33500, 35200, 34800, 37500, 38200, 39800, 40500, 41783]
    }
  };
  return {
    labels: datasets[period].labels,
    datasets: [{
      data: datasets[period].data
    }]
  };
}
function updatePerformanceChart(period) {
  if (window.performanceChart) {
    const newData = getPerformanceData(period);
    window.performanceChart.data.labels = newData.labels;
    window.performanceChart.data.datasets[0].data = newData.datasets[0].data;
    window.performanceChart.update();
  }
}
// ========== Market Page ==========
function initMarketPage() {
  initStockSelector();
  loadTradingViewWidget('NASDAQ:AAPL');
}
function initStockSelector() {
  const stockBtns = document.querySelectorAll('.stock-btn');
  
  stockBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      stockBtns.forEach(b => b.classList.remove('active'));
      this.classList.add('active');
      
      const symbol = this.dataset.symbol;
      loadTradingViewWidget(symbol);
    });
  });
}
function loadTradingViewWidget(symbol) {
  const container = document.getElementById('tradingview-widget');
  if (!container) return;
  container.innerHTML = '';
  const script = document.createElement('script');
  script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js';
  script.type = 'text/javascript';
  script.async = true;
  script.innerHTML = JSON.stringify({
    autosize: true,
    symbol: symbol,
    interval: 'D',
    timezone: 'Europe/Paris',
    theme: 'dark',
    style: '1',
    locale: 'fr',
    backgroundColor: 'rgba(18, 14, 30, 0)',
    gridColor: 'rgba(139, 92, 246, 0.06)',
    allow_symbol_change: false,
    hide_top_toolbar: false,
    hide_legend: false,
    save_image: false,
    calendar: false,
    support_host: 'https://www.tradingview.com'
  });
  container.appendChild(script);
}
// ========== Cours Page ==========
function initCoursePage() {
  initRiskToggle();
}
function initRiskToggle() {
  const riskToggle = document.getElementById('riskToggle');
  const riskContent = document.getElementById('riskContent');
  const chevron = riskToggle?.querySelector('.chevron');
  if (riskToggle && riskContent) {
    riskToggle.addEventListener('click', function() {
      const isOpen = riskContent.classList.toggle('open');
      chevron?.classList.toggle('open', isOpen);
    });
  }
}
// ========== Utility Functions ==========
function formatCurrency(amount) {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 2
  }).format(amount);

