package frc.robot;

public class DriveTrain {
	JoshMotorControllor joshmotorcontrollorLeftBottomOne;
	JoshMotorControllor joshmotorcontrollorLeftBottomTwo;
	JoshMotorControllor joshmotorcontrollorRightBottomOne;
	JoshMotorControllor joshmotorcontrollorRightBottomTwo;
	float lerpSpeed = 0.8f;

	public DriveTrain(int pwm1, int pwm2, int pwm3, int pwm4) {
		joshmotorcontrollorLeftBottomOne = new JoshMotorControllor(pwm1, lerpSpeed, true);
		joshmotorcontrollorLeftBottomTwo = new JoshMotorControllor(pwm2, lerpSpeed, true);
		joshmotorcontrollorRightBottomOne = new JoshMotorControllor(pwm3, lerpSpeed, true);
		joshmotorcontrollorRightBottomTwo = new JoshMotorControllor(pwm4, lerpSpeed, true);

	}

	public void Update() {
		joshmotorcontrollorLeftBottomOne.UpdateMotor();
		joshmotorcontrollorLeftBottomTwo.UpdateMotor();
		joshmotorcontrollorRightBottomOne.UpdateMotor();
		joshmotorcontrollorRightBottomTwo.UpdateMotor();
	}

	public void SetLeftSpeed(float Speed) {
		joshmotorcontrollorLeftBottomOne.target = Speed;
		joshmotorcontrollorLeftBottomTwo.target = Speed;
	}

	public void SetRightSpeed(float Speed) {
		joshmotorcontrollorRightBottomOne.target = -Speed;
		joshmotorcontrollorRightBottomTwo.target = -Speed;
	}

	public void SetBothSpeed(float Speed) {
		SetLeftSpeed(Speed);
		SetRightSpeed(Speed);
	}

	public void SetBreak() {
		joshmotorcontrollorRightBottomOne.SetBrake();
		joshmotorcontrollorRightBottomTwo.SetBrake();
		joshmotorcontrollorLeftBottomOne.SetBrake();
		joshmotorcontrollorLeftBottomTwo.SetBrake();
	}

	public void SetCoast() {
		joshmotorcontrollorRightBottomOne.SetCoast();
		joshmotorcontrollorRightBottomTwo.SetCoast();
		joshmotorcontrollorLeftBottomOne.SetCoast();
		joshmotorcontrollorLeftBottomTwo.SetCoast();

	}
}