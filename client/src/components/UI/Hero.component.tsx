import { styled } from '@mui/material/styles';

const Banner = styled("div")`
	display: flex;
	justify-content: center;
	align-items: center;
	padding-left: 24px;
	padding-right: 24px;
	@media (max-width: 768px) {
    	flex-direction: column;
  	}
`;

const Copy = styled("div")`
	width: 50%;

	& > h2 {
		font-size: 50px;
    	font-weight: 100;
		line-height: 42px;

		span {
			color: #f75b5b;
		}
	}

	p {
		color: #f75b5b;
	}
`

const HeroFigure = styled("div")`

	 img {
		max-width: 100%;
	}

`


const HeroBannerComponent = () => {
	return (
		<Banner>
			<Copy>
				<h2>
					Nike Air with <span>30%</span>
				</h2>
				<h2>
					discount!
				</h2>
				<p>
					Meet the shoes perfect suit to active lifestyle!
					Your feet won’t feel any fatigue!
				</p>
			</Copy>
			<HeroFigure>
				<img src={"/img/bg02.webp"} alt={'hero banner'} />
			</HeroFigure>
		</Banner>
	);
}

export default HeroBannerComponent;