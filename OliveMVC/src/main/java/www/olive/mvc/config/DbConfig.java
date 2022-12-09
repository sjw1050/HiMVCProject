package www.olive.mvc.config;

import org.mybatis.spring.SqlSessionFactoryBean;
import org.mybatis.spring.SqlSessionTemplate;
import org.mybatis.spring.annotation.MapperScan;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.support.PathMatchingResourcePatternResolver;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.jdbc.datasource.DataSourceTransactionManager;
import org.springframework.orm.jpa.LocalContainerEntityManagerFactoryBean;
import org.springframework.orm.jpa.vendor.HibernateJpaVendorAdapter;
import org.springframework.transaction.PlatformTransactionManager;

import com.zaxxer.hikari.HikariDataSource;

@Configuration
@EnableJpaRepositories("www.olive.mvc.util") // jpa사용하기 위한 패키지 탐색
@MapperScan("www.olive.mvc.util") // mybatis 사용하기 위한 패키지 탐색
public class DbConfig {

	@Bean(destroyMethod = "close")
	public HikariDataSource dataSource() {
		HikariDataSource ds = new HikariDataSource();
		ds.setDriverClassName("com.mysql.cj.jdbc.Driver");
		ds.setJdbcUrl("jdbc:mysql://localhost/olive?characterEncoding=utf8");
		ds.setUsername("root");
		ds.setPassword("admin");
		ds.addDataSourceProperty("cachePrepStmts", "true");
		ds.addDataSourceProperty("prepStmtCacheSize", "250");
		ds.addDataSourceProperty("prepStmtCacheSqlLimit", "2048");
		return ds;
	}

	@Bean
	LocalContainerEntityManagerFactoryBean EntityManagerFactory() {
		LocalContainerEntityManagerFactoryBean entityManagerFactory = new LocalContainerEntityManagerFactoryBean();
		entityManagerFactory.setDataSource(dataSource());
		entityManagerFactory.setPersistenceUnitName("jpa-mysql"); // persistence.xml의 설정 정의된 이름
		entityManagerFactory.setJpaVendorAdapter(new HibernateJpaVendorAdapter());

		return entityManagerFactory;
	}

	// mybatis 사용을 위한 sessionFactory bean 등록
	@Bean
	public SqlSessionFactoryBean sqlSessionFactory() throws Exception {
		SqlSessionFactoryBean sqlSessionFactory = new SqlSessionFactoryBean();
		sqlSessionFactory.setDataSource(dataSource());
		sqlSessionFactory.setConfigLocation(
				new PathMatchingResourcePatternResolver().getResource("classpath:mybatis-config.xml")); // mybatis 설정파일
																										// 등록
		return sqlSessionFactory;
	}

	// mybatis 사용을 위한 sqlSession bean 등록
	@Bean
	public SqlSessionTemplate sqlSession(SqlSessionFactoryBean sqlsessionFactory) throws Exception {
		return new SqlSessionTemplate(sqlsessionFactory.getObject());
	}

	@Bean
	public PlatformTransactionManager transactionManager() {
		DataSourceTransactionManager tm = new DataSourceTransactionManager();
		tm.setDataSource(dataSource());
		return tm;
	}
}
