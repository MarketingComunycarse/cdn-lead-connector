// version //
console.log('cdn active => v1.1.1 => sin uso');
// general //
const testStorage = (typeStorage:string): boolean => {
	try {
		const storage = window[typeStorage];
		const x = '__storage_test__';
		storage.setItem(x, x);
		storage.removeItem(x);
		return true;
	} catch (err) {
		console.log(err);
		return false;
	}
};
// set data user behaviour //
let sessionLandingPage: string, pageHistory: string[], lead: any = {};
const href = window.location.href;
const pathname: string = window.location.pathname;
const domain: string = window.location.hostname;
const paramsRaw: string = window.location.search;
const params = new URLSearchParams(paramsRaw);
const utmSource: string = params.get('utm_source') || '';
const utmMedium: string = params.get('utm_medium') || '';
const utmCampaign: string = params.get('utm_campaign') || '';
if( testStorage('localStorage') ){
	(!localStorage.getItem("utmSource")) ? localStorage.setItem('utmSource', utmSource) : '';
	(!localStorage.getItem("utmMedium")) ? localStorage.setItem('utmMedium', utmMedium) : '';
	(!localStorage.getItem("utmCampaign")) ? localStorage.setItem('utmCampaign', utmCampaign) : '';
};
const setSessionlandingPage = () => {
	if (testStorage('sessionStorage')) {
		sessionLandingPage = sessionStorage.getItem("sessionLandingPage");
		(!sessionLandingPage) ? sessionStorage.setItem("sessionLandingPage", domain + pathname) : '';
		const setSessionLandingPageInInput = () => {
			const landingpageInputs = document.querySelectorAll('.form-lp');
			landingpageInputs.forEach((input: HTMLInputElement) => input.value = sessionLandingPage);
		};
		(window.innerWidth > 0 && document.querySelector('.form-lp')) ? setSessionLandingPageInInput() : '';
	};
	lead['crm'] = {};
	lead.crm['landingPage'] = sessionLandingPage;
};
const setUserPagesHistory = () => {
	if (testStorage('localStorage')) {
		const pageHistoryFromLocalStorage = localStorage.getItem('pageHistory');
		pageHistory = JSON.parse(pageHistoryFromLocalStorage);
		if (pageHistory) {
			pageHistory.unshift(pathname);
			const lastTenPageHistory = pageHistory.slice(0, 10);
			localStorage.setItem('pageHistory', JSON.stringify(lastTenPageHistory));
			pageHistory = lastTenPageHistory;
		} else {
			localStorage.setItem('pageHistory', JSON.stringify([pathname]));
			pageHistory = [pathname];
		};
		const setpageHistoryInInput = () => {
			pageHistory.forEach((elem:string, index:number) => {
				const inputs = document.querySelectorAll(`.form-pagehistory-${index + 1}`);
				inputs.forEach((input: HTMLInputElement) => {
					input.value = elem;
				});
			});
		};
		(window.innerWidth > 0 && document.querySelector('.form-pagehistory-1')) ? setpageHistoryInInput() : '';
		lead['pageHistory'] = pageHistory;
	};
};
// set api data //
const ipstackAPI = 'df5bdd24829ff43d61cc03990c075ef2';
const ipstackURL = `https://api.ipstack.com/check/?access_key=${ipstackAPI}`;
let apiData: any;
const getApiData = async () => {
	try {
		if (!apiData){
			const responseRaw = await fetch(ipstackURL);
			const ApiResp = await responseRaw.json();
			(typeof (ApiResp) == 'object') ? apiData = ApiResp : '';
			lead['api'] = apiData;
		}
	} catch (err) {
		console.log(err);
	}
	addDataUbicToInputs();
}
// set form data //
const addDataUbicToInputs = () => {
	const ubic = `${apiData.city}, ${apiData.region_name}, ${apiData.country_name}`;
	if (document.querySelector('.form-ubic')) {
		const inputUbic = document.querySelectorAll('.form-ubic');
		inputUbic.forEach((input: HTMLInputElement) => {
			input.value = ubic;
		})
	}
}
const addDataNameToImputs = (fullname: string) => {
	const fullName = fullname;
	const inputsFname = document.querySelectorAll('input[name="fname"]');
	const inputsLname = document.querySelectorAll('input[name="lname"]');
	if (fullName && (inputsFname.length > 0) && (inputsLname.length > 0)) {
		const nameArray = fullName.split(" ");
		let lastName = (nameArray.slice(1, nameArray.length + 1)).join(' ');
		const firstName = nameArray[0].trim();
		lastName = lastName.trim();
		inputsFname.forEach((fName:HTMLInputElement) => {
			fName.value = firstName;
		});
		inputsLname.forEach((lName:HTMLInputElement) => {
			lName.value = lastName;
		});
	}
}
const setFormDataToLead = (event: any) => {
	lead.form = {};
	event.detail.inputs.forEach((input:any) => {
		lead.form[input.name] = input.value;
	})
	sendLeadToCRM();
};
const inputs = document.querySelectorAll('.wpcf7-form-control');
if (inputs.length > 0 && window.innerWidth > 0) {
	inputs.forEach(input => {
		input.addEventListener('input', (event: any) => {
			getApiData();
			(event.target.name == 'fullname') ? addDataNameToImputs(event.target.value) : '';
		});
	})
    document.addEventListener('wpcf7mailsent', setFormDataToLead, false);
}

// send lead to CRM //
const sendLeadToCRM = async ()=> {
	const langs = lead.api.location.languages;
	if(langs) {
		langs.forEach((lang:any) => {
			(lang.code == 'es') ? lead.crm.langUser = 'es' : '';
		});
		(!lead.crm.langUser) ? lead.crm.langUser = lead.api.location.languages[0].code : '';
	} else {
		lead.crm.langUser = 'es';
	};
	if(lead.pageHistory){
		let a: string[] = [];
		lead.pageHistory.forEach((elem:string, index:number) => {
			const e: string = `${index + 1}. ${elem}`;
			a.push(e);
		})
		lead.crm['pageHistory'] = a.join('\n');
	};
	const websites = ['comunycarse', 'ecomfax', 'recordia', 'cloudworldwideservices'];
	websites.forEach(web => {
		(domain.includes(web)) ? lead.crm['theme'] = web : '';
	});
	lead.crm['utmSource'] = localStorage.getItem("utmSource") || '';
	lead.crm['utmMedium'] = localStorage.getItem("utmMedium") || '';
	lead.crm['utmCampaign'] = localStorage.getItem("utmCampaign") || '';
	(lead.crm.utmMedium == 'cpc') ? lead.crm['leadOrigin'] = 'Dpto. de Marketing (Campaña CPC)' : lead.crm['leadOrigin'] = 'Dpto. de Marketing';
	lead.crm = {
		...lead.crm,
		firstname: lead.form.fname || '',
		lastname: lead.form.lname || '',
		email: lead.form.email || '',
		phone: lead.form.phone || '',
		comments: lead.form.comments || '',
		company: lead.form.company || '',
		job: lead.form.job || '',
		city: lead.api.city || '',
		zip: lead.api.zip || '',
		region: lead.api.region_name || '',
		country: lead.api.country_name || '',
		owner: '951c4e24-e2f3-e911-a811-000d3ab61098',
		uip: lead.api.ip || '',
		website: domain || '',
		leadGeneratedFrom: domain + pathname || '',
	};
	const apiFlow = "https://prod-253.westeurope.logic.azure.com/workflows/a28d26b522dc4078be9230e528ec282b/triggers/manual/paths/invoke/leadToCrm?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=3pnhu6xcJk-ndLfms-Z8Hp_roUdmMj1rYMC3FahJKd0";
	try {
		await fetch( apiFlow, {
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(lead.crm)
		});
		sendLeadToDataBase();
	} catch (err) {
		console.log(err);
	}

	console.log(lead);
}

// send lead to DB //
firebase.initializeApp({
	apiKey: "AIzaSyCzHO8J6xRErJST5YDEuE8cN_6m-EpLRTo",
	authDomain: "lead-manager-pozuelo.firebaseapp.com",
	projectId: "lead-manager-pozuelo",
});
const db = firebase.firestore();
let dataForm: object = {};
let timestamp: number, today: string, month: string, year: string, source: string, currentUrl: string;
const sendLeadToDataBase = ()=> {
	timestamp = new Date().getTime();
	today = new Date().toLocaleString('en-US', { dateStyle: 'full', timeStyle: 'long', timeZone: 'Europe/Madrid'});
	month = new Date().toLocaleString('en-US', {month: 'long', timeZone: 'Europe/Madrid'});
	year = new Date().toLocaleString('en-US', {year: 'numeric', timeZone: 'Europe/Madrid'});
	const leadToDB: any = {
		...lead,
		status: 0,
		createDate: today,
		timestamp,
		source: domain,
	};
	db.collection(`leads-${year}-${month}`).add(leadToDB).then(() => {
		goThanksPage();
	}).catch((err: any) => console.error(err));
};
const goThanksPage = () => {
	const websitesWithThanksPage = ['ecomfax', 'recordia'];
	const isDownload = document.querySelector('#download-form') || false;
	websitesWithThanksPage.forEach(web => {
		if(domain.includes(web)) {
			if(isDownload) {
				if (pathname.includes("/es/")) {
					window.location.href = "/es/gracias-download/";
				} else {
					window.location.href = "/en/thanks-download/";
				};
			} else {
				if (pathname.includes("/es/")) {
					window.location.href = "/es/gracias/";
				} else {
					window.location.href = "/en/thanks/";
				};
			}
		}
	});
};

// STARTERS //
setSessionlandingPage();
setUserPagesHistory();
