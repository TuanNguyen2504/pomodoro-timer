import useAlarmSound from '../../hooks/useAlarmSound';
import ClockUI from './ClockUI';

interface PomodoroProps {
	onTimeout: () => void;
}

function showWindowNotification(
	title: string = 'Message',
	options?: NotificationOptions,
): Notification | void {
	if (!window.Notification) {
		return alert("Browser doesn't support notifications");
	}

	if (Notification.permission === 'granted') {
		return new Notification(title, options);
	} else {
		Notification.requestPermission().then(function (p: NotificationPermission) {
			if (p === 'granted') {
				return new Notification(title, options);
			}
		});
	}
}

function PomodoroClock({ onTimeout }: PomodoroProps) {
	const alarmSound: HTMLAudioElement = useAlarmSound();

	const handlePomodoroTimeout = () => {
		const notification: Notification | void = showWindowNotification(
			'Dyno Timer Notification',
			{
				body: 'Time to take short break time',
				icon: '/src/favicon.png',
			},
		);

		if (notification) {
			alarmSound.play();

			notification.onclose = function () {
				alarmSound.pause();
			};
		}

		onTimeout();
	};

	return <ClockUI onTimeout={handlePomodoroTimeout} />;
}

export default PomodoroClock;