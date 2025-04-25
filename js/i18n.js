const i18n = {
	locale: 'es',
	messages: {},
  
	async loadLocale(locale) {
	  const response = await fetch(`./lang/${locale}.json`);
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
  
  document.addEventListener('DOMContentLoaded', async () => {
	// Recuperar el idioma del localStorage, si está disponible
	const savedLocale = localStorage.getItem('locale') || i18n.locale;
	await i18n.loadLocale(savedLocale);
	if(document.querySelector("#lang")){
		document.querySelector("#lang").innerHTML = savedLocale;
	}
	
	document.querySelectorAll('#lang-switcher>button').forEach((el) => { 
	  el.addEventListener('click', async (e) => {
		await i18n.loadLocale(el.dataset.value);
		document.querySelector("#lang").innerHTML = i18n.locale;
	
		//history.pushState({}, '',  i18n.locale);

	  });
	});
  });
  