import './Next7Days.css.proxy.js';
/* src\components\weather\Next7Days.svelte generated by Svelte v3.31.2 */
import {
	SvelteComponent,
	append,
	attr,
	destroy_each,
	detach,
	element,
	init,
	insert,
	noop,
	safe_not_equal,
	set_data,
	space,
	text
} from "../../../web_modules/svelte/internal.js";

function get_each_context(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[1] = list[i].day;
	child_ctx[2] = list[i].weatherIcon;
	child_ctx[3] = list[i].rain;
	child_ctx[4] = list[i].minTemp;
	child_ctx[5] = list[i].maxTemp;
	return child_ctx;
}

// (16:2) {#each daily as { day, weatherIcon, rain, minTemp, maxTemp }}
function create_each_block(ctx) {
	let div0;
	let t0_value = /*day*/ ctx[1] + "";
	let t0;
	let t1;
	let img;
	let img_src_value;
	let t2;
	let div1;
	let t3_value = /*rain*/ ctx[3] + "";
	let t3;
	let t4;
	let div2;
	let t5_value = /*minTemp*/ ctx[4] + "";
	let t5;
	let t6;
	let div3;
	let t7_value = /*maxTemp*/ ctx[5] + "";
	let t7;

	return {
		c() {
			div0 = element("div");
			t0 = text(t0_value);
			t1 = space();
			img = element("img");
			t2 = space();
			div1 = element("div");
			t3 = text(t3_value);
			t4 = space();
			div2 = element("div");
			t5 = text(t5_value);
			t6 = space();
			div3 = element("div");
			t7 = text(t7_value);
			attr(div0, "class", "forecast__day header--justify-left svelte-p6zs98");
			attr(img, "class", "forecast__weather-icon");
			if (img.src !== (img_src_value = "./icons/weather/" + /*weatherIcon*/ ctx[2] + ".svg")) attr(img, "src", img_src_value);
			attr(img, "alt", "daily weather icon");
			attr(img, "width", "28px");
			attr(img, "height", "28px");
			attr(div1, "class", "forecast__rain");
			attr(div2, "class", "forecast__min-temp");
			attr(div3, "class", "forecast__max-temp");
		},
		m(target, anchor) {
			insert(target, div0, anchor);
			append(div0, t0);
			insert(target, t1, anchor);
			insert(target, img, anchor);
			insert(target, t2, anchor);
			insert(target, div1, anchor);
			append(div1, t3);
			insert(target, t4, anchor);
			insert(target, div2, anchor);
			append(div2, t5);
			insert(target, t6, anchor);
			insert(target, div3, anchor);
			append(div3, t7);
		},
		p(ctx, dirty) {
			if (dirty & /*daily*/ 1 && t0_value !== (t0_value = /*day*/ ctx[1] + "")) set_data(t0, t0_value);

			if (dirty & /*daily*/ 1 && img.src !== (img_src_value = "./icons/weather/" + /*weatherIcon*/ ctx[2] + ".svg")) {
				attr(img, "src", img_src_value);
			}

			if (dirty & /*daily*/ 1 && t3_value !== (t3_value = /*rain*/ ctx[3] + "")) set_data(t3, t3_value);
			if (dirty & /*daily*/ 1 && t5_value !== (t5_value = /*minTemp*/ ctx[4] + "")) set_data(t5, t5_value);
			if (dirty & /*daily*/ 1 && t7_value !== (t7_value = /*maxTemp*/ ctx[5] + "")) set_data(t7, t7_value);
		},
		d(detaching) {
			if (detaching) detach(div0);
			if (detaching) detach(t1);
			if (detaching) detach(img);
			if (detaching) detach(t2);
			if (detaching) detach(div1);
			if (detaching) detach(t4);
			if (detaching) detach(div2);
			if (detaching) detach(t6);
			if (detaching) detach(div3);
		}
	};
}

function create_fragment(ctx) {
	let section;
	let div0;
	let t0;
	let div1;
	let t1;
	let div2;
	let t3;
	let div3;
	let t5;
	let div4;
	let t7;
	let each_value = /*daily*/ ctx[0];
	let each_blocks = [];

	for (let i = 0; i < each_value.length; i += 1) {
		each_blocks[i] = create_each_block(get_each_context(ctx, each_value, i));
	}

	return {
		c() {
			section = element("section");
			div0 = element("div");
			t0 = space();
			div1 = element("div");
			t1 = space();
			div2 = element("div");
			div2.textContent = "Rain";
			t3 = space();
			div3 = element("div");
			div3.textContent = "Min";
			t5 = space();
			div4 = element("div");
			div4.textContent = "Max";
			t7 = space();

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].c();
			}

			attr(div0, "class", "forecast__header header--justify-left svelte-p6zs98");
			attr(div1, "class", "forecast__header svelte-p6zs98");
			attr(div2, "class", "forecast__header svelte-p6zs98");
			attr(div3, "class", "forecast__header svelte-p6zs98");
			attr(div4, "class", "forecast__header svelte-p6zs98");
			attr(section, "class", "forecast svelte-p6zs98");
		},
		m(target, anchor) {
			insert(target, section, anchor);
			append(section, div0);
			append(section, t0);
			append(section, div1);
			append(section, t1);
			append(section, div2);
			append(section, t3);
			append(section, div3);
			append(section, t5);
			append(section, div4);
			append(section, t7);

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].m(section, null);
			}
		},
		p(ctx, [dirty]) {
			if (dirty & /*daily*/ 1) {
				each_value = /*daily*/ ctx[0];
				let i;

				for (i = 0; i < each_value.length; i += 1) {
					const child_ctx = get_each_context(ctx, each_value, i);

					if (each_blocks[i]) {
						each_blocks[i].p(child_ctx, dirty);
					} else {
						each_blocks[i] = create_each_block(child_ctx);
						each_blocks[i].c();
						each_blocks[i].m(section, null);
					}
				}

				for (; i < each_blocks.length; i += 1) {
					each_blocks[i].d(1);
				}

				each_blocks.length = each_value.length;
			}
		},
		i: noop,
		o: noop,
		d(detaching) {
			if (detaching) detach(section);
			destroy_each(each_blocks, detaching);
		}
	};
}

function instance($$self, $$props, $$invalidate) {
	let { daily } = $$props;

	$$self.$$set = $$props => {
		if ("daily" in $$props) $$invalidate(0, daily = $$props.daily);
	};

	return [daily];
}

class Next7Days extends SvelteComponent {
	constructor(options) {
		super();
		init(this, options, instance, create_fragment, safe_not_equal, { daily: 0 });
	}
}

export default Next7Days;