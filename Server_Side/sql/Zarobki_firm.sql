
select 	umowa.nazwa_firmy as 'Firma pogrzebowa',   count(*)*umowa.marża as 'Zarobki z 2 lat'  from pogrzeb
left join umowa 
	on pogrzeb.firma = umowa.id
where pogrzeb.id in (
		select id from pogrzeb
        where data >  date_sub(curdate(), interval 2 year)
)
group by umowa.nazwa_firmy