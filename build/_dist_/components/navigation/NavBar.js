import './NavBar.css.proxy.js';
/* src\components\navigation\NavBar.svelte generated by Svelte v3.31.2 */
import {
	SvelteComponent,
	append,
	attr,
	component_subscribe,
	detach,
	element,
	init,
	insert,
	is_function,
	listen,
	noop,
	run_all,
	safe_not_equal,
	space
} from "../../../web_modules/svelte/internal.js";

import { locationStore, databaseStore } from "../../stores/stores.js";

function create_fragment(ctx) {
	let nav;
	let button0;
	let img0;
	let img0_src_value;
	let t0;
	let button1;
	let t1;
	let button2;
	let img2;
	let img2_src_value;
	let mounted;
	let dispose;

	return {
		c() {
			nav = element("nav");
			button0 = element("button");
			img0 = element("img");
			t0 = space();
			button1 = element("button");
			button1.innerHTML = `<img class="button__icon" src="./icons/buttons/search.svg" alt="Search" width="32px" height="30px"/>`;
			t1 = space();
			button2 = element("button");
			img2 = element("img");
			attr(img0, "class", "button__icon");

			if (img0.src !== (img0_src_value = "./icons/buttons/" + (/*isBookmarked*/ ctx[3]
			? "bookmark-rem"
			: "bookmark-add") + ".svg")) attr(img0, "src", img0_src_value);

			attr(img0, "alt", "Bookmark");
			attr(img0, "width", "32px");
			attr(img0, "height", "28px");
			attr(button0, "class", "button nav__button button--bookmark");
			attr(button0, "type", "button");
			attr(button1, "class", "button nav__button button--search");
			attr(button1, "type", "button");
			attr(img2, "class", "button__icon");
			if (img2.src !== (img2_src_value = "./icons/buttons/" + (/*isGeolocation*/ ctx[2] ? "gps" : "no-gps") + ".svg")) attr(img2, "src", img2_src_value);
			attr(img2, "alt", "Geolocation");
			attr(img2, "width", "30px");
			attr(img2, "height", "30px");
			attr(button2, "class", "button nav__button button--geolocation");
			attr(button2, "type", "button");
			attr(nav, "class", "nav svelte-m3ez6y");
		},
		m(target, anchor) {
			insert(target, nav, anchor);
			append(nav, button0);
			append(button0, img0);
			append(nav, t0);
			append(nav, button1);
			append(nav, t1);
			append(nav, button2);
			append(button2, img2);

			if (!mounted) {
				dispose = [
					listen(button0, "click", function () {
						if (is_function(/*toggleBookmark*/ ctx[5](/*longLabel*/ ctx[1]))) /*toggleBookmark*/ ctx[5](/*longLabel*/ ctx[1]).apply(this, arguments);
					}),
					listen(button1, "click", /*click_handler*/ ctx[9]),
					listen(button2, "click", /*geolocation*/ ctx[4])
				];

				mounted = true;
			}
		},
		p(new_ctx, [dirty]) {
			ctx = new_ctx;

			if (dirty & /*isBookmarked*/ 8 && img0.src !== (img0_src_value = "./icons/buttons/" + (/*isBookmarked*/ ctx[3]
			? "bookmark-rem"
			: "bookmark-add") + ".svg")) {
				attr(img0, "src", img0_src_value);
			}

			if (dirty & /*isGeolocation*/ 4 && img2.src !== (img2_src_value = "./icons/buttons/" + (/*isGeolocation*/ ctx[2] ? "gps" : "no-gps") + ".svg")) {
				attr(img2, "src", img2_src_value);
			}
		},
		i: noop,
		o: noop,
		d(detaching) {
			if (detaching) detach(nav);
			mounted = false;
			run_all(dispose);
		}
	};
}

function instance($$self, $$props, $$invalidate) {
	let longLabel;
	let isGeolocation;
	let bookmarks;
	let isBookmarked;
	let $locationStore;
	let $databaseStore;
	component_subscribe($$self, locationStore, $$value => $$invalidate(6, $locationStore = $$value));
	component_subscribe($$self, databaseStore, $$value => $$invalidate(8, $databaseStore = $$value));
	let { componentName } = $$props;

	const geolocation = () => {
		// try geolocation via the Navigator API
		locationStore.tryCurrentLocation(longLabel).// successful (user allowed geolocation)
		then(value => value && databaseStore.modifySetting({ setting: "isGeolocation", value })).// error (user denied geolocation)
		catch(() => databaseStore.modifySetting({ setting: "isGeolocation", value: false }));
	};

	const toggleBookmark = itemIndex => {
		// if bookmarked, remove bookmark in indexedDB, using its index (longLabel property)
		if (isBookmarked) return databaseStore.removeBookmark(itemIndex);

		const { coords, shortLabel, longLabel } = $locationStore;

		// if not already bookmarked, add bookmark to indexedDB
		return databaseStore.addBookmark({ coords, shortLabel, longLabel });
	};

	const checkBookmarks = (all, currentLongLabel) => {
		if (Array.isArray(all) && !all.length) return false;

		// convert longLabel property in each bookmark to a string for comparison
		const longLabelStrings = all.map(({ longLabel }) => JSON.stringify(longLabel));

		// if current longLabel is bookmarked, return true
		return longLabelStrings.includes(JSON.stringify(currentLongLabel));
	};

	const click_handler = () => $$invalidate(0, componentName = "SearchLocation");

	$$self.$$set = $$props => {
		if ("componentName" in $$props) $$invalidate(0, componentName = $$props.componentName);
	};

	$$self.$$.update = () => {
		if ($$self.$$.dirty & /*$locationStore*/ 64) {
			// coords, shortLabel (city & country code) & longLabel (city, counties etc.)
			$: $$invalidate(1, { longLabel } = $locationStore, longLabel);
		}

		if ($$self.$$.dirty & /*$databaseStore*/ 256) {
			// Navigator API geolocation flag, units ('metric'/'imperial'), bookmarked cities
			$: $$invalidate(2, { settings: { isGeolocation }, bookmarks } = $databaseStore, isGeolocation, ($$invalidate(7, bookmarks), $$invalidate(8, $databaseStore)));
		}

		if ($$self.$$.dirty & /*bookmarks, longLabel*/ 130) {
			// is current city bookmarked by the user
			$: $$invalidate(3, isBookmarked = checkBookmarks(bookmarks, longLabel));
		}
	};

	return [
		componentName,
		longLabel,
		isGeolocation,
		isBookmarked,
		geolocation,
		toggleBookmark,
		$locationStore,
		bookmarks,
		$databaseStore,
		click_handler
	];
}

class NavBar extends SvelteComponent {
	constructor(options) {
		super();
		init(this, options, instance, create_fragment, safe_not_equal, { componentName: 0 });
	}
}

export default NavBar;