<template>
	<div>
		<section class="section lede">
			<div>
				<p class="announce">If</p>
				<p>
					you live in a northern Alaska coastal community<br />
					hunt or fish in a marine environment<br />
					work in shipping or oil and gas<br />
					serve with the Coast Guard<br />
					research Arctic ecosystems<br />
					&mdash; OR &mdash;<br />
					are simply interested in<br />
					Arctic sea ice data &nbsp; climate change
				</p>
				<p class="announce">This atlas is for you.</p>
			</div>
		</section>
		<section class="section about">
			<div class="centered--wrapper">
				<div class="explainer">
					<h4>This Atlas shows sea ice concentration.</h4>
				</div>
				<p class="overview">
					View historical sea ice data from the seas around the circumpolar North<br />
					and discover how ice concentrations have changed over time.
				</p>
				<p class="overview">
					This Atlas shows snapshots in time, as well as long term patterns.<br />
					It is not designed for forecasting or prediction,<br />
					but can provide historical context for planning efforts.
				</p>
				<div class="explainer">
					<h5>Sea ice concentration = ratio of sea ice to water</h5>
					<p>&lt;30% sea ice concentration = ships can travel here. <br />&gt;90% = solid ice.</p>
					<p>
						<a href="https://nsidc.org/cryosphere/quickfacts/seaice.html"
							>Learn more about sea ice</a
						>
					</p>
				</div>
			</div>
		</section>
	</div>
</template>

<style lang="scss" scoped>
section.lede {
	text-align: center;
	div {
		margin: 0 auto;
		padding-top: 1.5rem;
		border-top: 1px solid #eee;
		p {
			margin-top: 2rem;
			font-size: 22px;
			font-weight: 400;
			line-height: 1.6;
			font-style: italic;
		}
		p.announce {
			font-family: 'Imbue', serif;
			font-weight: 600;
			font-style: normal;
			font-size: 3.8rem;
			line-height: 0.9;
			text-transform: uppercase;
		}
	}
}

.centered--wrapper {
	margin: 0 auto;
	font-size: 1.2rem;
	text-align: center;
	line-height: 1.6;
}

.explainer {
	h4 {
		font-size: 1.8rem;
		font-weight: 700;
	}
	h5 {
		margin-top: 2rem;
		font-weight: 700;
		font-size: 1.5rem;
	}
}
</style>
