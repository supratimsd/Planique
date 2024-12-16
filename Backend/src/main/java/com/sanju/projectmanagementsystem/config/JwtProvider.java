package com.sanju.projectmanagementsystem.config;

import java.util.Base64;
import java.util.Collection;
import java.util.Date;
import java.util.stream.Collectors;

import javax.crypto.SecretKey;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;

public class JwtProvider {
        // static SecretKey key=Keys.hmacShaKeyFor(JwtConstant.SECRET_KEY.getBytes());
        // private static final SecretKey key = Keys.secretKeyFor(SignatureAlgorithm.HS256);
        private static final SecretKey key = Keys.hmacShaKeyFor(Base64.getDecoder().decode(JwtConstant.SECRET_KEY));

        public static String generateToken(Authentication auth){
            Collection<? extends GrantedAuthority> authorities=auth.getAuthorities();
            String authoritiesString = authorities.stream()
            .map(GrantedAuthority::getAuthority)
            .collect(Collectors.joining(","));


            String jwt=Jwts.builder().setIssuedAt(new Date()).setExpiration(new Date(new Date().getTime()+86400000)).claim("email", auth.getName()).claim("authorities", authoritiesString).signWith(key).compact();
            return jwt;
        }

        public static String getEmailFromToken(String jwt){
            jwt=jwt.substring(7);
            Claims claims=Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(jwt).getBody();
            String email=String.valueOf(claims.get("email"));
            return email;
        }
}
