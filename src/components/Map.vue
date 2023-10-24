<template>
	<div class="map--section--wrapper">
		<div class="map--direct-wrapper" v-bind:class="{ sidelined: foldoutActive }">
			<div class="map--wrapper">
				<div class="map--overlay-wrapper">
					<!-- Slider wrapper! -->
					<div class="slider-wrapper">
						<p class="date--display--date">Sea Ice Concentration, {{ displayDate }}</p>
						<vue-slider
							v-model="selectedDate"
							:min="1850"
							:max="2021"
							:marks="marks"
							:tooltip-placement="'bottom'"
						/>
						<div class="slider-wrapper--button-wrapper">
							<span v-on:click="decrementMonth" :disabled="pastButtonDisabled" class="button">
								<i class="fas fa-arrow-alt-circle-left" /><span class="month-indicator"
									>Past Month</span
								>
							</span>
							<span v-on:click="incrementMonth" :disabled="nextButtonDisabled" class="button">
								<span class="month-indicator">Next Month</span>
								<i class="fas fa-arrow-alt-circle-right" />
							</span>

							<span class="hint">Use slider above to change year</span>
						</div>
					</div>

					<div
						class="report--show-current-button button is-link"
						v-on:click="foldoutActive = true"
						v-bind:class="{ hidden: !validMapPixel }"
					>
						<span class="text"> Show report for selected location </span>
						<span class="icon is-large">
							<i class="fas fa-arrow-right"></i>
						</span>
					</div>
					<table class="map--legend">
						<tbody>
							<tr>
								<td class="conc--1">0&ndash;30&nbsp;%</td>
								<td class="conc--2">31&ndash;40&nbsp;%</td>
								<td class="conc--3">41&ndash;50&nbsp;%</td>
								<td class="conc--4">51&ndash;60&nbsp;%</td>
								<td class="conc--5">61&ndash;70&nbsp;%</td>
								<td class="conc--6">71&ndash;80&nbsp;%</td>
								<td class="conc--7">81&ndash;90&nbsp;%</td>
								<td class="conc--8">91&ndash;100&nbsp;%</td>
							</tr>
						</tbody>
					</table>
				</div>

				<div id="map--main"></div>
			</div>
		</div>
	</div>
</template>

<style lang="scss" scoped>
.map--section--wrapper {
	.map--wrapper {
		height: 90vh;
		position: relative;

		.map--overlay-wrapper {
			position: absolute;
			background-color: rgba(255, 255, 255, 0.8);
			top: 0;
			left: 0;
			padding: 0 1rem 1rem 1rem;
			z-index: 10000;
			width: 50vw;

			.map--legend {
				font-family: 'Open Sans', sans-serif;
				background-color: #fff;
				margin: 0 auto;
				box-shadow: 0 22px 70px 4px rgba(0, 0, 0, 0.56);
				width: 100%;
				tbody tr {
					color: #fff;
					font-weight: 700;
					text-align: center;
					& td {
						font-size: 0.7rem;
						padding: 0.25rem;
						&.conc--1 {
							width: 33%;
							background-color: rgba(8, 29, 88, 255) !important;
						}
						&.conc--2 {
							background-color: rgba(37, 52, 148, 255) !important;
						}
						&.conc--3 {
							background-color: rgba(34, 94, 168, 255) !important;
						}
						&.conc--4 {
							background-color: rgba(29, 145, 192, 255) !important;
							text-shadow: 0 0 3px #000;
						}
						&.conc--5 {
							background-color: rgba(65, 182, 196, 255) !important;
							text-shadow: 0 0 3px #000;
						}
						&.conc--6 {
							background-color: rgba(127, 205, 187, 255) !important;
							color: rgba(8, 29, 88, 255);
						}
						&.conc--7 {
							background-color: rgba(199, 233, 180, 255) !important;
							color: rgba(8, 29, 88, 255);
						}
						&.conc--8 {
							background-color: rgba(237, 248, 217, 255) !important;
							color: rgba(8, 29, 88, 255);
						}
					}
				}
			}

			.report--show-current-button {
				box-shadow: 0 0 1rem rgba(0, 0, 0, 0.25);
				margin-bottom: 1rem;
				&.hidden {
					display: none;
				}
			}
		}

		.location--drop-down {
			background-color: white;
			position: absolute;
			top: 1.5rem;
			right: 1.5rem;
			z-index: 10000;
			box-shadow: 0 0 1rem rgba(0, 0, 0, 0.25);
		}

		.slider-wrapper {
			margin: 1rem auto 0;
			padding: 1rem;

			p.date--display--date {
				margin: -1rem 0 0 -0.5rem;
				font-size: 1.75rem;
				font-weight: 700;
			}

			.slider-wrapper--button-wrapper {
				margin: 2rem -1rem 0;
				.button {
					margin-right: 1rem;
					& i.fas {
						display: inline-block;

						&.fa-arrow-alt-circle-left {
							margin-right: 0.5rem;
						}
						&.fa-arrow-alt-circle-right {
							margin-left: 0.5rem;
						}
					}
				}
			}
		}
	}
}
</style>
