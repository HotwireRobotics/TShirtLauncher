package frc.robot;

import edu.wpi.first.wpilibj.TimedRobot;
import edu.wpi.first.wpilibj.DoubleSolenoid;
import edu.wpi.first.wpilibj.Encoder;
import edu.wpi.first.wpilibj.Joystick;
import edu.wpi.first.wpilibj.smartdashboard.SmartDashboard;
import edu.wpi.first.wpilibj.SPI;
import edu.wpi.first.wpilibj.motorcontrol.Talon;
import edu.wpi.first.wpilibj.Timer;
import edu.wpi.first.wpilibj.DigitalInput;
import edu.wpi.first.cscore.UsbCamera;
import edu.wpi.first.cameraserver.CameraServer;

import java.nio.Buffer;
import java.rmi.server.Operation;

//import com.ctre.phoenix.motorcontrol.ControlMode;
//import com.ctre.phoenix.motorcontrol.can.TalonSRX;
import edu.wpi.first.wpilibj.Ultrasonic;
import edu.wpi.first.wpilibj.DoubleSolenoid.Value;
import edu.wpi.first.wpilibj.GenericHID.RumbleType;
import edu.wpi.first.wpilibj.Joystick.AxisType;
//import edu.wpi.first.wpilibj.interfaces.Potentiometer;
import edu.wpi.first.wpilibj.AnalogInput;
import edu.wpi.first.wpilibj.AnalogPotentiometer;
//import com.kauailabs.navx.frc.AHRS;

import edu.wpi.first.wpilibj.smartdashboard.SmartDashboard;
import edu.wpi.first.networktables.NetworkTable;
import edu.wpi.first.networktables.NetworkTableEntry;
import edu.wpi.first.networktables.NetworkTableInstance;
import edu.wpi.first.wpilibj.PIDController;
import edu.wpi.first.wpilibj.PneumaticsModuleType;
import edu.wpi.first.wpilibj.RobotState;
//import edu.wpi.first.hal.PDPJNI;
import edu.wpi.first.wpilibj.Compressor;
import edu.wpi.first.wpilibj.motorcontrol.Spark;

public class Robot extends TimedRobot {

	// Sensors
	public HotPot pot = new HotPot(0);

	// Drivetrain
	public DriveTrain driveTrain = new DriveTrain(0, 1, 2, 3);

	// Compressors

	public Spark pistonCompressor = new Spark(7);
	public Spark launcherCompressor = new Spark(8);
	public Spark launcherCompressorTwo = new Spark(9);

	// Tank, no not the tank that runs you over.
	public Spark tank = new Spark(6);
	public double tankMoveSpeed = 0.2;
	public double tankHoldSpeed = 0.0;

	//Motors
    //public CANSparkMax arm1 = new CANSparkMax(21, MotorType.kBrushless);
    //public CANSparkMax arm2 = new CANSparkMax(22, MotorType.kBrushless);


	// Solenoids
	public DoubleSolenoid launcher = new DoubleSolenoid(PneumaticsModuleType.CTREPCM, 0, 1);

	// Joysticks
	public Joystick driver = new Joystick(0);
	public Joystick flightStickLeft = new Joystick(2);
	public Joystick flightStickRight = new Joystick(3);


	// Pressure Sensor
	public AnalogInput launcherPressure = new AnalogInput(2);
	public AnalogInput pistonPressure = new AnalogInput(1);

	public double pistonPressureTarget = 50;
	public double launcherPressureTarget = 70;

	private boolean pistonCharged = false;
	private boolean launcherCharged = false;

	public boolean autofill = true;

	public void robotInit() {
	}

	public void disabledInit() {
	}

	public void autonomousInit() {
	}

	public void autonomousPeriodic() {
	}

	public void teleopInit() {
		driver = new Joystick(0);
		flightStickLeft = new Joystick(2);
		flightStickRight = new Joystick(3);

	}

	public void teleopPeriodic() {
		//arm1.set(0.5);

		ControllerDrive();

		if (driver.getRawButtonPressed(3)) {
			autofill = !autofill;
		}

		if (driver.getRawButton(5)) {
			launcher.set(Value.kForward);
		} else {
			launcher.set(Value.kReverse);
		}

		if (PistonPressure() < pistonPressureTarget) {
			pistonCharged = false;
		}
		if (PistonPressure() > pistonPressureTarget + 5) {
			pistonCharged = true;
		}

		if (LauncherPressure() < launcherPressureTarget) {
			launcherCharged = false;
		}
		if (LauncherPressure() > launcherPressureTarget + 5) {
			launcherCharged = true;
		}
			


		System.out.println("Tank Pressure " + LauncherPressure());
		//System.out.println("Piston Pressure " + PistonPressure());

		if (driver.getRawButton(1)) {
			tank.set(tankMoveSpeed);
		} else if (driver.getRawButton(4)) {
			tank.set(-tankMoveSpeed);
		} else {
			tank.set(tankHoldSpeed);
		}

		if (autofill) {

			if (driver.getRawButton(2)) {
				launcherCompressor.set(1.0f);
				launcherCompressorTwo.set(1.0f);
			} else {
				if (launcherCharged) {
					launcherCompressor.set(0.0f);
					launcherCompressorTwo.set(0.0f);
				} else {
					launcherCompressor.set(1.0f);
					launcherCompressorTwo.set(1.0f);
				}
			}

			if (pistonCharged) {
				pistonCompressor.set(0.0f);
			} else {
				pistonCompressor.set(1.0f);
			}

		} else {
			pistonCompressor.set(0.0);
			launcherCompressor.set(0.0);
			launcherCompressorTwo.set(0.0);
			System.out.println("Autofill off.");
		}

		driveTrain.Update();
	}

	public void testInit() {
	}

	public void testPeriodic() {
	}

	public void CompressorsOn() {
	}

	public void CompressorOff() {
	}

	public float TranslateController(float input) {
		float deadzone = 0.15f;
		if (input > -deadzone && input < deadzone) {
			input = 0.0f;
		}
		float a = 0.7f;
		float output = (a * input * input * input) + (1 - a) * input;
		return output;
	}

	public void ControllerDrive() {
		float horJoystick = TranslateController((float) flightStickRight.getRawAxis(0));
		float verJoystick = TranslateController((float) flightStickLeft.getRawAxis(1));

		driveTrain.SetRightSpeed(-verJoystick + -horJoystick);
		System.out.println(-verJoystick + -horJoystick);
		driveTrain.SetLeftSpeed(-verJoystick + horJoystick);
		driveTrain.SetCoast();
	}

	public void DrivetrainBrakes(boolean brakes) {
		if (brakes = true) {
			driveTrain.SetBreak();
		} else {
			driveTrain.SetCoast();
		}
	}

	public double LauncherPressure() {
		return (250.0 * (launcherPressure.getAverageVoltage() / 5.0) - 25.0);
	}

	public double PistonPressure() {
		return (250.0 * (pistonPressure.getAverageVoltage() / 5.0) - 25.0);

	}
}