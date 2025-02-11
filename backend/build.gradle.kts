plugins {
	java
	id("org.springframework.boot") version "3.4.2"
	id("io.spring.dependency-management") version "1.1.7"
	id("org.graalvm.buildtools.native") version "0.10.4"
}

group = "com.github.YukkiMoru"
version = "0.0.1-SNAPSHOT"

java {
	toolchain {
		languageVersion = JavaLanguageVersion.of(21)
	}
}

repositories {
	mavenCentral()
}

dependencies {
	// Spring Boot(バックエンド)の依存関係
	implementation("org.springframework.boot:spring-boot-starter-web")
	testImplementation("org.springframework.boot:spring-boot-starter-test")
	// JUnit 5の依存関係
	testRuntimeOnly("org.junit.platform:junit-platform-launcher")
	// データベース用の依存関係
	runtimeOnly("com.mysql:mysql-connector-j")
	implementation("org.springframework.boot:spring-boot-starter-jdbc")
	// ホットリロード用の依存関係
	developmentOnly("org.springframework.boot:spring-boot-devtools")
	// GraalVMでPythonを使うための依存関係
	implementation("org.graalvm.polyglot:polyglot:24.1.2")
	implementation("org.graalvm.python:python-language:24.1.2")
}

tasks.withType<Test> {
	useJUnitPlatform()
}
