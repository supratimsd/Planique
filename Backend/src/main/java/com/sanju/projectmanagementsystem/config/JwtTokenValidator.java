// package com.sanju.projectmanagementsystem.config;

// import java.io.IOException;

// import java.util.List;

// import javax.crypto.SecretKey;

// import io.jsonwebtoken.Claims;
// import io.jsonwebtoken.Jwts;
// import io.jsonwebtoken.security.Keys;
// import jakarta.servlet.FilterChain;
// import jakarta.servlet.ServletException;
// import jakarta.servlet.http.HttpServletRequest;
// import jakarta.servlet.http.HttpServletResponse;
// import org.springframework.security.authentication.BadCredentialsException;
// import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
// import org.springframework.security.core.Authentication;
// import org.springframework.security.core.GrantedAuthority;
// import org.springframework.security.core.authority.AuthorityUtils;
// import org.springframework.security.core.context.SecurityContextHolder;
// import org.springframework.web.filter.OncePerRequestFilter;


// public class JwtTokenValidator extends OncePerRequestFilter{

//     @Override
//     protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
//             throws ServletException, IOException {
//        String jwt=request.getHeader(JwtConstant.JWT_HEADER);
//        //Bareer token
//        if(jwt!=null){
//         jwt=jwt.substring(7);
       
//        try {
//         SecretKey key=Keys.hmacShaKeyFor(JwtConstant.SECRET_KEY.getBytes());
//         Claims claims=Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(jwt).getBody();
//         String email=String.valueOf(claims.get("email"));
//         String authorities=String.valueOf(claims.get("authorities"));

//         List<GrantedAuthority> auths=AuthorityUtils.commaSeparatedStringToAuthorityList(authorities);
//         Authentication authentication=new UsernamePasswordAuthenticationToken(email, null, auths);
//         SecurityContextHolder.getContext().setAuthentication(authentication);

//         System.out.println("Authenticated user: " + email);
//     System.out.println("Authorities: " + authorities);
//        }  catch (Exception e) {
//           System.err.println("Token validation failed: " + e.getMessage());
//           throw new BadCredentialsException("Invalid Token", e);
//       }
//      }
//      filterChain.doFilter(request, response);
//     }
    
// }







package com.sanju.projectmanagementsystem.config;

import java.io.IOException;
import java.util.Base64;
import java.util.List;
import javax.crypto.SecretKey;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

public class JwtTokenValidator extends OncePerRequestFilter {

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {
        String jwt = request.getHeader(JwtConstant.JWT_HEADER);

        if (jwt != null && jwt.startsWith("Bearer ")) {
            jwt = jwt.substring(7);

            try {
               SecretKey key = Keys.hmacShaKeyFor(Base64.getDecoder().decode(JwtConstant.SECRET_KEY));

                Claims claims = Jwts.parserBuilder()
                                    .setSigningKey(key)
                                    .build()
                                    .parseClaimsJws(jwt)
                                    .getBody();

                String email = String.valueOf(claims.get("email"));
                String authorities = String.valueOf(claims.get("authorities"));

                if (email == null || authorities == null) {
                    System.err.println("Invalid claims in JWT");
                    throw new BadCredentialsException("Invalid claims in JWT");
                }
                System.out.println("Token successfully validated");
                List<GrantedAuthority> auths = AuthorityUtils.commaSeparatedStringToAuthorityList(authorities);
                Authentication authentication = new UsernamePasswordAuthenticationToken(email, null, auths);
                SecurityContextHolder.getContext().setAuthentication(authentication);

                System.out.println("Authenticated user: " + email);
                System.out.println("Authorities: " + authorities);
            } catch (io.jsonwebtoken.ExpiredJwtException e) {
                System.err.println("JWT is expired: " + e.getMessage());
                response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
                response.getWriter().write("Token Expired");
                return;
            } catch (io.jsonwebtoken.MalformedJwtException e) {
                System.err.println("JWT is malformed: " + e.getMessage());
                response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
                response.getWriter().write("Malformed Token");
                return;
            } catch (Exception e) {
                System.err.println("Token validation failed: " + e.getMessage());
                throw new BadCredentialsException("Invalid Token", e);
            }
        }

        filterChain.doFilter(request, response);
    }
}

