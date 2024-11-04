import { useState, useEffect, useCallback } from "react";

interface UseCountdownTimerProps {
	expiryTime: string;
	newTimer: string;
	onExpire?: () => void;
}

interface TimeLeft {
	minutes: string;
	seconds: string;
	isExpired: boolean;
}

export const useCountdownTimer = ({
	expiryTime,
	onExpire,
	newTimer,
}: UseCountdownTimerProps): TimeLeft => {
	const calculateTimeLeft = useCallback((): TimeLeft => {
		if (!newTimer) {
			const now = new Date().getTime();
			const expiryDate = new Date(expiryTime).getTime();
			const timeDifference = expiryDate - now;

			if (timeDifference <= 0) {
				return {
					minutes: "00",
					seconds: "00",
					isExpired: true,
				};
			}

			const minutes = Math.floor(
				(timeDifference % (1000 * 60 * 60)) / (1000 * 60)
			);
			const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

			return {
				minutes: minutes.toString().padStart(2, "0"),
				seconds: seconds.toString().padStart(2, "0"),
				isExpired: false,
			};
		} else {
			const now = new Date().getTime();
			const expiryDate = new Date(newTimer).getTime();
			const timeDifference = expiryDate - now;

			if (timeDifference <= 0) {
				return {
					minutes: "00",
					seconds: "00",
					isExpired: true,
				};
			}

			const minutes = Math.floor(
				(timeDifference % (1000 * 60 * 60)) / (1000 * 60)
			);
			const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

			return {
				minutes: minutes.toString().padStart(2, "0"),
				seconds: seconds.toString().padStart(2, "0"),
				isExpired: false,
			};
		}
	}, [expiryTime, newTimer]);

	const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft());

	useEffect(() => {
		const timer = setInterval(() => {
			const newTimeLeft = calculateTimeLeft();
			setTimeLeft(newTimeLeft);

			if (newTimeLeft.isExpired) {
				clearInterval(timer);
				onExpire?.();
			}
		}, 1000);

		return () => clearInterval(timer);
	}, [calculateTimeLeft, onExpire]);

	return timeLeft;
};
