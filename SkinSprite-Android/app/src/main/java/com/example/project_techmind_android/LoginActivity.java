package com.example.project_techmind_android;

import android.content.Intent;
import android.os.Build;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.CheckBox;
import android.widget.EditText;
import android.widget.Toast;
import androidx.appcompat.app.AppCompatActivity;

public class LoginActivity extends AppCompatActivity {

    private EditText editTextUsername;
    private EditText editTextPassword;
    private CheckBox rememberMeCheckBox;
    private Button loginButton;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_login);

        editTextUsername = findViewById(R.id.editTextText4);
        editTextPassword = findViewById(R.id.editTextTextPassword);
        rememberMeCheckBox = findViewById(R.id.rememberMe);
        loginButton = findViewById(R.id.login);

        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.LOLLIPOP) {
            getWindow().setNavigationBarColor(getResources().getColor(R.color.white));
            getWindow().setStatusBarColor(getResources().getColor(R.color.bg));
        }
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            getWindow().getDecorView().setSystemUiVisibility(
                    View.SYSTEM_UI_FLAG_LIGHT_NAVIGATION_BAR | View.SYSTEM_UI_FLAG_LIGHT_STATUS_BAR
            );
        }


        loginButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                String username = editTextUsername.getText().toString().trim();
                String password = editTextPassword.getText().toString().trim();

                // Check if username and password are not empty
                if (username.isEmpty() || password.isEmpty()) {
                    Toast.makeText(LoginActivity.this, "Please enter username and password", Toast.LENGTH_SHORT).show();
                    return;
                }

                // For now, let's assume login is successful
                // You can replace this with your actual login logic later

                // Show login successful toast
                Toast.makeText(LoginActivity.this, "Login successful", Toast.LENGTH_SHORT).show();

                // Forward user to FeaturesPageActivity
                Intent intent = new Intent(LoginActivity.this, FeaturesPageActivity.class);
                startActivity(intent);
                finish(); // Optional: finish LoginActivity to prevent going back to it on back press
            }
        });
    }

    private void loginUser() {
        String username = editTextUsername.getText().toString().trim();
        String password = editTextPassword.getText().toString().trim();

        // Check if username and password are not empty
        if (username.isEmpty() || password.isEmpty()) {
            Toast.makeText(this, "Please enter username and password", Toast.LENGTH_SHORT).show();
            return;
        }

        // Check authentication with MySQLConnection (Assuming it's a separate class)
        boolean isAuthenticated = MySQLConnection.authenticateUser(username, password);

        if (isAuthenticated) {
            // Successful login
            // Navigate to the home activity or perform any other action
            Toast.makeText(this, "Login successful", Toast.LENGTH_SHORT).show();
        } else {
            // Authentication failed
            // Check if the username exists
            boolean isUserExists = MySQLConnection.isUserExists(username);

            if (isUserExists) {
                // Incorrect password
                Toast.makeText(this, "Incorrect password", Toast.LENGTH_SHORT).show();
            } else {
                // Account does not exist, prompt to sign up
                Toast.makeText(this, "Account doesn't exist. Please sign up.", Toast.LENGTH_SHORT).show();

                // Redirect to the SignUpActivity
                Intent intent = new Intent(LoginActivity.this, SignUpActivity.class);
                startActivity(intent);
            }
        }
    }
}
