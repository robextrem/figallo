const i18n = {
	locale: 'es',
	messages: {},
  
	async loadLocale(locale) {
	  const response = await fetch(`/lang/${locale}.json`);
	  this.messages = await response.json();
	  this.locale = locale;
	  localStorage.setItem('locale', locale); // Guardar el idioma en el localStorage
	  this.translateDOM();
	},
  
	t(key) {
	  return this.messages[key] || key;
	},
  
	translateDOM() {
	  document.querySelectorAll('[data-i18n]').forEach(el => {
		const key = el.getAttribute('data-i18n');
		el.textContent = this.t(key);
	  });
	}
  };

  const paths ={
	"es": "/es-mx/servicios-relaciones-publicas ",
	"en": "/en/pr-agency-mexico",
	"zh": "/zh/moxige-gongguan-gongsi"
  }
  
  document.addEventListener('DOMContentLoaded', async () => {
	// Recuperar el idioma del localStorage, si está disponible
	const savedLocale = localStorage.getItem('locale') || i18n.locale;
	await i18n.loadLocale(savedLocale);
	if(document.querySelector("#lang")){
		document.querySelector("#lang").innerHTML = savedLocale;

		document.querySelectorAll(".portafolio").forEach((el) => {
			el.style.display = el.dataset.lang == i18n.locale ? "block" : "none";
		})
	}
	
	document.querySelectorAll('#lang-switcher>button').forEach((el) => { 
	  el.addEventListener('click', async (e) => {
		await i18n.loadLocale(el.dataset.value);
		document.querySelector("#lang").innerHTML = i18n.locale;
		document.querySelectorAll(".portafolio").forEach((el) => {
			el.style.display = el.dataset.lang == i18n.locale ? "block" : "none";
		})
		history.pushState({}, '',  paths[i18n.locale]);

	  });
	});
  });
  