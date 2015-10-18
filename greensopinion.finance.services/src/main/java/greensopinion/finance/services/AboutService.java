package greensopinion.finance.services;

import greensopinion.finance.services.web.model.About;

public class AboutService {

	public About getAbout() {
		return new About(getApplicationName(), getCopyrightNotice());
	}

	private String getApplicationName() {
		return GreenGap.APP_NAME;
	}

	private String getCopyrightNotice() {
		return "Copyright (c) 2015 David Green.  All rights reserved.";
	}
}
